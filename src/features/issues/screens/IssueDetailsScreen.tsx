import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useIssueStore } from '../store/issueStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<
  MainStackParamList,
  'IssueDetails'
>;

const IssueDetailsScreen = ({route, navigation }: Props) => {
  const {id} = route.params;
  const {issue, viewIssue, deleteIssue} = useIssueStore();

  useEffect(() => {
    viewIssue(id);
  }, [id]);

  if(!issue) return <Text>Loading...</Text>

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Issue Details Screen</Text>
      <Text>{issue.title}</Text>
      <Text>Description: {issue.description}</Text>
      <Text>Status: {issue.status}</Text>
      <Text>Priority: {issue.priority}</Text>
      <Text>Assignee: {issue.assignee}</Text>
      <Text>CreatedAt: {issue.createdAt}</Text>

      <Button 
        title='Edit'
        onPress={() => navigation.navigate('EditIssue', {id})}
      />

      <Button 
        title='Delete'
        onPress={() => {
          deleteIssue(id);
          navigation.goBack();
        }}
      />
    </View>
  )
}

export default IssueDetailsScreen