export type IssueStatus = 
    |"Open" 
    | "In Progress" 
    | "Resolved" 
    | "Closed";

export type IssuePriority = 
    |"Low" 
    | "Medium" 
    | "High";

export type UpdatedIssue = Partial<Omit<Issue, 'id'>>;

export interface Issue{
    id: string;
    title: string;
    description?: string;
    status: IssueStatus;
    priority: IssuePriority;
    assignee?: string;
    createdAt: string;
    imageUri?: string;
}

export type syncActionTyp = 
    |'CREATE' 
    | 'UPDATE' 
    | 'DELETE';

export interface SyncQueueItem {
    id: string;
    type: syncActionTyp;
    payload: any;
    createdAt: string;
}