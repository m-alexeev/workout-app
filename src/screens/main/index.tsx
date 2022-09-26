import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./Home";
import StatisticsPage from "./Statistics";
import { MainBottomTabParamList } from "../../types/navigation";
import { useTheme } from "../../contexts/theme";
import WorkoutPage from "./Workout";
import ExerciseScreenStack from "./exercises_screens/ExerciseStack";
import { Ionicons } from "@expo/vector-icons";

const MainBottomTabs = createBottomTabNavigator<MainBottomTabParamList>();

export interface IMainStackInterface {}

const MainStackScreen: React.FC<IMainStackInterface> = (props) => {
  const { theme } = useTheme();

  return (
    <MainBottomTabs.Navigator
      initialRouteName="Exercises"
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
            <Ionicons color={color} size={size} name="home-sharp" />
          ),
        }}
      />
        <MainBottomTabs.Screen
          name="Exercises"
          component={ExerciseScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons color={color} size={size} name="barbell" />
            ),
          }}
        />
      <MainBottomTabs.Screen
        name="Statistics"
        component={StatisticsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="md-bar-chart" />
          ),
        }}
      />
      <MainBottomTabs.Screen
        name="Workout"
        component={WorkoutPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="add-circle" />
          ),
        }}
      />
    </MainBottomTabs.Navigator>
  );
};

export default MainStackScreen;
