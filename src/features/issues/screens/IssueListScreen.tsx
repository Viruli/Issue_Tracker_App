import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useIssueStore } from '../store/issueStore'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';



const IssueListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {issues , loadIssues} = useIssueStore();

useFocusEffect(
  useCallback(() => {
    loadIssues();
  }, [])
);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>IssueListScreen</Text>
      <Text>Total Issues: {issues.length}</Text>
      <Button
        title="Create Issue"
        onPress={() => navigation.navigate('CreateIssue')}
      />
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('IssueDetails', { id: item.id })
            }
          >
            <View>
              <Text>{item.title}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Priority: {item.priority}</Text>
              <Text>CreatedAt: {item.createdAt}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No issues found</Text>}
      />
    </View>
  )
}

export default IssueListScreen