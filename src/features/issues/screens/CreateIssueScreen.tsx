import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIssueStore } from '../store/issueStore'
import { TextInput } from 'react-native-gesture-handler';
import { MainStackParamList } from '../../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IssuePriority, IssueStatus } from '../types';
import uuid from 'react-native-uuid';

type createProps = NativeStackScreenProps<
  MainStackParamList,
  'CreateIssue'
>;

type editProps = NativeStackScreenProps<
  MainStackParamList,
  'EditIssue'
>;

type Props = createProps | editProps;


const CreateIssueScreen = ({route, navigation} : Props) => {
  const isEdit = route.name === 'EditIssue';
  const issueId = route.params?.id;
  const {addIssue, viewIssue, issue, updateIssue} = useIssueStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<IssueStatus>('Open');
  const [priority, setPriority] = useState<IssuePriority>('Low');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    if(isEdit && issueId){
      viewIssue(issueId)
    }
  }, [issueId]);

  useEffect(() => {
    if(isEdit && issue){
      setTitle(issue.title)
      setDescription(issue.description ?? '')
      setStatus(issue.status)
      setPriority(issue.priority)
      setAssignee(issue.assignee ?? '')
    }
  }, [issue])

  const handleSubmit = () => {
    if(!title.trim()) return;

    if(isEdit && issueId){
      updateIssue(issueId,{
        title,
        description,
        status,
        priority,
        assignee,
        createdAt: issue?.createdAt || new Date().toISOString(),
      });
    }else{
    addIssue({
      id: uuid.v4().toString(),
      title,
      description,
      status,
      priority,
      assignee,
      createdAt: new Date().toISOString(),
    });
  }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CreateIssueScreen</Text>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle}/>

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription}/>

      <Text>Status</Text>
      <Button title="Open" onPress={() => setStatus('Open')} />
      <Button title="In Progress" onPress={() => setStatus('In Progress')} />
      <Button title="Resolved" onPress={() => setStatus('Resolved')} />
      <Button title="Closed" onPress={() => setStatus('Closed')} />

      <Text>Priority</Text>
      <Button title="Low" onPress={() => setPriority('Low')} />
      <Button title="Medium" onPress={() => setPriority('Medium')} />
      <Button title="High" onPress={() => setPriority('High')} />

      <Text>Asignee</Text>
      <TextInput value={assignee} onChangeText={setAssignee}/>
      <Button title="Create Issue" onPress={handleSubmit}/>
    </View>
  )
}

export default CreateIssueScreen

