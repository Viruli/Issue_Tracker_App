import { create } from "zustand";
import { Issue, SyncQueueItem, UpdatedIssue } from "../types";
import { issueApi } from "../service/issueApi";
import {
  createIssueRepo,
  deleteIssueRepo,
  getAllIssuesRepo,
  getIssueRepo,
  updateIssueRepo,
} from "../repository/issueRepository";
import uuid from "react-native-uuid";
import { isOnline } from "../../../shared/utils/network";

type IssueStore = {
  issues: Issue[];
  issue: Issue | null;
  syncQueue: SyncQueueItem[];
  isLoading: boolean;
  error: string | null;
  loadIssues: () => Promise<void>;
  refreshIssues: () => Promise<void>;
  addIssue: (issue: Issue) => Promise<void>;
  viewIssue: (id: string) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
  updateIssue: (id: string, updateIssue: UpdatedIssue) => Promise<void>;
  retrySyncQueue: () => Promise<void>;
  clearError: () => void;
  getIssueStats: () => {
    all: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
};

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [],

  issue: null,

  syncQueue: [],

  isLoading: false,

  error: null,

  clearError: () => {
    set({ error: null });
  },

  loadIssues: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const localData = getAllIssuesRepo();

      set({ issues: localData });
    } catch (error) {
      set({ error: "Failed to Load Issues" });
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshIssues: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const remoteData = await issueApi.getAllIssues();

      set({ issues: remoteData });
    } catch (error) {
      set({ error: "Failed to refresh errors" });
      console.log(error);
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  addIssue: async (issue) => {
    createIssueRepo(issue);

    set((state) => ({
      issues: [...state.issues, issue],
    }));

    const online = await isOnline();

    if (!online) {
      set((state) => ({
        syncQueue: [
          ...state.syncQueue,
          {
            id: uuid.v4().toString(),
            type: "CREATE",
            payload: issue,
            createdAt: new Date().toISOString(),
          },
        ],
        error: "Issue saved locally. Will sync when online.",
      }));
    }
    await issueApi.createIssue(issue);
  },

  viewIssue: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      //Local fetch
      const localData = getIssueRepo(id);

      set({
        issue: localData,
      });
    } catch (error) {
      set({ error: "Failed to load issue" });
      console.log(error);
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  deleteIssue: async (id) => {
    deleteIssueRepo(id);

    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
      issue: null,
    }));

    const online = await isOnline();

    if (!online) {
      const queueItem: SyncQueueItem = {
        id: uuid.v4().toString(),
        type: "DELETE",
        payload: { id },
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        syncQueue: [...state.syncQueue, queueItem],
        error: "Delete saved locally. Will sync later.",
      }));
    }

    await issueApi.deleteIssue(id);
  },

  updateIssue: async (id, updatedData) => {
    // 1. LOCAL DB FIRST
    updateIssueRepo(id, updatedData);

    // 2. UI UPDATE
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? { ...issue, ...updatedData } : issue,
      ),
      issue:
        state.issue?.id === id
          ? { ...state.issue, ...updatedData }
          : state.issue,
    }));

    const online = await isOnline();

    if (!online) {
      set((state) => ({
        syncQueue: [
          ...state.syncQueue,
          {
            id: uuid.v4().toString(),
            type: "UPDATE",
            payload: { id, ...updatedData },
            createdAt: new Date().toISOString(),
          },
        ],
        error: "Update saved locally. Will sync when online.",
      }));
    }

    // 3. TRY API CALL
    await issueApi.updateIssue(id, updatedData);
  },
  retrySyncQueue: async () => {
    const queue = get().syncQueue;

    if (queue.length === 0) return;

    const online = await isOnline();

    if (!online) {
      set({ error: "You are offline. Cannot sync." });
      return;
    }

    const remaining: SyncQueueItem[] = [];

    for (const item of queue) {
      try {
        switch (item.type) {
          case "CREATE":
            await issueApi.createIssue(item.payload);
            break;

          case "UPDATE":
            await issueApi.updateIssue(item.payload.id, item.payload);
            break;

          case "DELETE":
            await issueApi.deleteIssue(item.payload.id);
            break;
        }
      } catch {
        remaining.push(item);
      }
    }

    set({
      syncQueue: remaining,
      error: null,
    });
  },
  getIssueStats: () => {
    const issues = get().issues;

    return {
      all: issues.length,
      open: issues.filter((i) => i.status === "Open").length,
      inProgress: issues.filter((i) => i.status === "In Progress").length,
      resolved: issues.filter((i) => i.status === "Resolved").length,
    };
  },
}));
