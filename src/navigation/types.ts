export type AuthStackParamList = {
  Login: undefined;
};


export type MainStackParamList = {
    Dashboard: undefined;
    IssueList: undefined;
    CreateIssue: undefined;
    IssueDetails: {id: string};
    EditIssue: {id: string};
}