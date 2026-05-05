import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from "./AuthNavigator";
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
        {isLoggedIn ?( <MainNavigator/> ):( <AuthNavigator onLogin={() => setIsLoggedIn(true)}/>)}
    </NavigationContainer>
  )
}

export default AppNavigator