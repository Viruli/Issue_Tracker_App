import { apiClient } from "../../../infrastructure/api/client";
import { Issue, UpdatedIssue } from "../types";

export const issueApi = {
    getAllIssues: async (): Promise<Issue[]> => {
        const response = await apiClient.get('/issues');
        return response.data;
    },

    createIssue: async (issue: Issue): Promise<Issue> => {
        const response = await apiClient.post('/issues', issue);
        return response.data;
    },

    updateIssue: async (id: string, updatedIssue: UpdatedIssue) => {
        const response = await apiClient.put(`/issues/${id}`, updatedIssue);
        return response.data;
    },

    deleteIssue: async (id: string) => {
        const response = await apiClient.delete(`/issues/${id}`);
        return response.data;
    },

    getIssue: async (id: string) => {
        const response = await apiClient.get(`/issues/${id}`);
        return response.data;
    }
}