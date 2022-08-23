import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./Home";
import { MainBottomTabParamList } from "../../types/navigation";
import ExercisesPage from "./Exercises";
import Icon from "react-native-vector-icons/FontAwesome";

const MainBottomTabs = createBottomTabNavigator<MainBottomTabParamList>();

export interface IMainStackInterface {}

const MainStackScreen: React.FC<IMainStackInterface> = (props) => {
  return (
    <MainBottomTabs.Navigator screenOptions={{ headerShown: false }}>
      <MainBottomTabs.Screen
        name="Home"
        component={HomePage}
        options={{ tabBarIcon: ({}) => <Icon name="home"></Icon> }}
      />
      <MainBottomTabs.Screen name="Exercises" component={ExercisesPage} />
    </MainBottomTabs.Navigator>
  );
};

export default MainStackScreen;
