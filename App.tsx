import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseConfig } from './config';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useFonts } from 'expo-font';
import { type } from './src/theme/fonts';

import AuthStackScreen from './src/screens/auth';
import LoadingScreen from './src/screens/misc/Loading';
import MainStackScreen from './src/screens/misc';

import { RootStackParamList } from './src/types/navigation';
import ThemeProvider from './src/contexts/theme';

export interface IAppProps { }


const Stack = createNativeStackNavigator<RootStackParamList>();

firebase.initializeApp(firebaseConfig)

const App: React.FC<IAppProps> = (props) => {
  const [isLoading, setLoading] = useState(true);
  let [fontsLoaded] = useFonts(type);

  if (isLoading || !fontsLoaded) {
    return (
      <LoadingScreen setLoading={setLoading} />
    )
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {firebase.auth().currentUser ?
            <Stack.Screen name='MainStackRoute' component={MainStackScreen} />
            :
            <Stack.Screen name='AuthStackRoute' component={AuthStackScreen} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;