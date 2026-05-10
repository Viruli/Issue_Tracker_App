import { StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import initDB from './src/infrastructure/database/init'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from './src/shared/theme/ThemeContext'

const App = () => {
  useEffect(() => {
    initDB();
  }, []);

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
) 
}

export default App

const styles = StyleSheet.create({})