import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomePage from './Home';


export interface IMainStackInterface {}

const MainStack = createBottomTabNavigator();

const MainStackScreen: React.FC<IMainStackInterface> = (props) => {

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Home" component={HomePage}/>
    </MainStack.Navigator>
  )
}

export default MainStackScreen;