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

    updateIssue:async (id, updatedData) => {
        try{
            //local db
            updateIssueRepo(id, updatedData);

            //update UI
            set((state) => ({
                issues: state.issues.map(
                    (issue) =>
                    issue.id === id
                ? {
                    ...issue,
                    ...updatedData,
                  }
                : issue
            ),

            issue:
                state.issue?.id === id
                ? {
                  ...state.issue,
                  ...updatedData,
                }
                : state.issue,
            }));

            //update through api
            await issueApi.updateIssue(id, updatedData);

        }catch(error){
            const queueItem : SyncQueueItem = {
                id: uuid.v4().toString(),
                type: 'UPDATE',
                payload: {id, ...updatedData},
                createdAt: new Date().toISOString(),
            };

            set((state) => ({
                syncQueue: [
                    ...state.syncQueue, 
                    queueItem,
                ],
                error: 'Update saved locally. Sync pending.'
            }));
            console.log(error);
        }      
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
}))