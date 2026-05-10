export type AuthStackParamList = {
  Login: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  IssueList: undefined;
  CreateIssue: undefined;
  IssueDetails: { id: string };
  EditIssue: { id: string };
};
