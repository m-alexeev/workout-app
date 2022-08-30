import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./Home";
import StatisticsPage from "./Statistics";
import { MainBottomTabParamList } from "../../types/navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "../../contexts/theme";
import WorkoutPage from "./Workout";
import ExerciseScreenStack from "./exercises_screens/ExerciseStack";

const MainBottomTabs = createBottomTabNavigator<MainBottomTabParamList>();

export interface IMainStackInterface {}

const MainStackScreen: React.FC<IMainStackInterface> = (props) => {
  const { theme } = useTheme();

  return (
    <MainBottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.background,
          shadowRadius: 15,
          shadowColor: theme.primary,
          borderTopWidth: 0,
        },
      }}
    >
      <MainBottomTabs.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} size={size} name="home" />
          ),
        }}
      />
        <MainBottomTabs.Screen
          name="Exercises"
          component={ExerciseScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon color={color} size={size} name="dumbbell" />
            ),
          }}
        />
      <MainBottomTabs.Screen
        name="Statistics"
        component={StatisticsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} size={size} name="chart-area" />
          ),
        }}
      />
      <MainBottomTabs.Screen
        name="Workout"
        component={WorkoutPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} size={size} name="plus" />
          ),
        }}
      />
    </MainBottomTabs.Navigator>
  );
};

export default MainStackScreen;
