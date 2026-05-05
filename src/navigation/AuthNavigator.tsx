import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../features/auth/screens/LoginScreen'

const Stack = createNativeStackNavigator();

type Props = {
  onLogin: () => void;
};

const AuthNavigator = ({onLogin} : Props) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={onLogin} />}
        </Stack.Screen>
    </Stack.Navigator>
  )
}

export default AuthNavigator