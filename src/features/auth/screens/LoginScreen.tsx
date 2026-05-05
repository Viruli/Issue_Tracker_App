import { View, Text, Button } from 'react-native'
import React from 'react'

type Props = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <Button title='Login' onPress={onLogin}/>
    </View>
  )
}

export default LoginScreen