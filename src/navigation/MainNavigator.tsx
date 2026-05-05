import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IssueListScreen from '../features/issues/screens/IssueListScreen'

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Issues"
            component={IssueListScreen}
        />
    </Stack.Navigator>
  )
}

export default MainNavigator