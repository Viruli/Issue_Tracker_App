import { create } from "zustand";
import { Issue, SyncQueueItem, UpdatedIssue } from "../types"
import { issueApi } from "../service/issueApi";
import { createIssueRepo, deleteIssueRepo, getAllIssuesRepo, getIssueRepo, updateIssueRepo } from "../repository/issueRepository";
import uuid from 'react-native-uuid';

type IssueStore = {
    issues: Issue[];
    issue: Issue | null;
    syncQueue: SyncQueueItem[];
    isLoading: boolean;
    error: string | null;
    loadIssues: () => Promise<void>;
    refreshIssues: () => Promise<void>;
    addIssue: (issue : Issue) => Promise<void>;
    viewIssue: (id : string) => Promise<void>;
    deleteIssue: (id : string) => Promise<void>;
    updateIssue: (id:string, updateIssue: UpdatedIssue) => Promise<void>;
    retrySyncQueue: () => Promise<void>;
    clearError: () => void;
    getIssueStats: () => {
    all: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
}

export const useIssueStore = create<IssueStore> ((set, get) => ({
    issues: [],

    issue: null,

    syncQueue:[],

    isLoading: false,

    error: null,

    clearError: () => {
        set({ error: null });
    },

    loadIssues: async () => {
        try{
            set({
                isLoading: true,
                error: null,
            });

            const localData = getAllIssuesRepo();
            
            set({issues: localData});
            
        }catch(error){

            set({error: 'Failed to Load Issues'});
            console.log(error);

        }finally{
            set({isLoading: false});
        }
    },

    refreshIssues: async () => {
        try{
            set({
                isLoading:true,
                error: null,
            });

            const remoteData = await issueApi.getAllIssues();

            set({issues: remoteData});

        }catch(error){

            set({error: 'Failed to refresh errors'});
            console.log(error);

        }finally{
            set({
                isLoading: false,
            });
        }
    },

    addIssue:async (issue) => {
        try{
            //local db
            createIssueRepo(issue);

            //update UI
            set((state) => ({
                issues: [...state.issues, issue]
            }));

            //add thorugh api call
            await issueApi.createIssue(issue)

        }catch(error){
            // Enqueue failed sync
            const queueItem : SyncQueueItem = {
                id: uuid.v4().toString(),
                type: 'CREATE',
                payload: issue,
                createdAt: new Date().toISOString(),
            };

            set((state) => ({
                syncQueue: [
                    ...state.syncQueue, 
                    queueItem,
                ],
                error: 'Issue saved locally. Sync pending.'
            }));

            console.log(error);
        }
        
        
    },

    viewIssue:async (id) => {
        try{
            set({
                isLoading: true,
                error: null,
            });

            //Local fetch
            const localData = getIssueRepo(id);

            set({
                issue: localData
            });

        }catch(error){
            set({error: 'Failed to load issue'});
            console.log(error);

        }finally{
            set({
                isLoading:false
            });
        }
    },

    deleteIssue:async (id) => {
        try{
            //local db
            deleteIssueRepo(id);

            //update UI
            set((state) => ({
            issues: state.issues.filter((issue) => issue.id !== id),
            issue: undefined,
        }));

        //update through api
        await issueApi.deleteIssue(id);

        }catch(error){
            const queueItem : SyncQueueItem = {
                id: uuid.v4().toString(),
                type: 'DELETE',
                payload: id,
                createdAt: new Date().toISOString(),
            };

            set((state) => ({
                syncQueue: [
                    ...state.syncQueue, 
                    queueItem,
                ],
                error: 'Issue deleted locally. Sync pending.'
            }));
            console.log(error);
        }
        
        
    },

    updateIssue: async (id, updatedData) => {
  try {
    // 1. UPDATE LOCAL DB (source of truth)
    updateIssueRepo(id, updatedData);

    // 2. UPDATE UI STATE
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id
          ? { ...issue, ...updatedData }
          : issue
      ),

      issue:
        state.issue?.id === id
          ? { ...state.issue, ...updatedData }
          : state.issue,
    }));

  } catch (error) {
    console.log('Local update failed:', error);
  }

  // 3. ADD TO SYNC QUEUE (NO API CALL)
  const queueItem: SyncQueueItem = {
    id: uuid.v4().toString(),
    type: 'UPDATE',
    payload: { id, ...updatedData },
    createdAt: new Date().toISOString(),
  };

  set((state) => ({
    syncQueue: [...state.syncQueue, queueItem],
  }));
},

    //retry sync operations if failed
    retrySyncQueue: async() => {
        const queue = get().syncQueue;

        const remainingQueue: SyncQueueItem[] = [];

        for(const item of queue){
            try{
                switch(item.type){
                    case 'CREATE':
                        await issueApi.createIssue(item.payload);
                        break;
                    
                    case 'UPDATE':
                        await issueApi.updateIssue(item.payload.id, item.payload);
                        break;

                    case 'DELETE':
                        await issueApi.deleteIssue(item.payload.id);
                        break;
                }
            } catch(error){
                remainingQueue.push(item);
                console.log(error);
            }
        }

        set({syncQueue: remainingQueue,});

    },
    getIssueStats: () => {
        const issues = get().issues;

        return {
            all: issues.length,
            open: issues.filter(i => i.status === 'Open').length,
            inProgress: issues.filter(i => i.status === 'In Progress').length,
            resolved: issues.filter(i => i.status === 'Resolved').length,
        };
    },
}))