import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IssueListScreen from '../features/issues/screens/IssueListScreen'
import CreateIssueScreen from '../features/issues/screens/CreateIssueScreen';
import { MainStackParamList } from './types';
import IssueDetailsScreen from '../features/issues/screens/IssueDetailsScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={BottomTabNavigator}
        />
        <Stack.Screen 
            name="IssueList"
            component={IssueListScreen}
            options={{title: 'Issues'}}
        />
        <Stack.Screen
          name="CreateIssue"
          component={CreateIssueScreen}
          options={{title: 'Create Issue'}}
        />
        <Stack.Screen
          name="IssueDetails"
          component={IssueDetailsScreen}
          options={{title: 'Issue Details'}}
        />
        <Stack.Screen
          name="EditIssue"
          component={CreateIssueScreen}
          options={{title: 'Issue Details'}}
        />
    </Stack.Navigator>
  )
}

export default MainNavigator