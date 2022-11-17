import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Login';
import RegisterScreen from './Register';
import LocalUserCreateScreen from './LocalUserCreate';

export interface IAuthStackInterface { }

const AuthStack = createNativeStackNavigator();

const AuthStackScreen: React.FC<IAuthStackInterface> = (props) => {

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LocalUser" component={LocalUserCreateScreen}></AuthStack.Screen>
      <AuthStack.Screen name='Login' component={LoginScreen}></AuthStack.Screen>
      {/* <AuthStack.Screen name="Register" component={RegisterScreen}></AuthStack.Screen> */}
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen;