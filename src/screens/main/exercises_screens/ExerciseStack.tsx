import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import ExerciseDetails from "./ExerciseDetails";
import ExercisesPage from "./Exercises";

export interface IExerciseScreenStackProps {}

const ExerciseStack = createNativeStackNavigator<ExercisesStackParamList>();

const ExerciseScreenStack: React.FC<IExerciseScreenStackProps> = (props) => {
  const {theme} = useTheme();

  return (
    <ExerciseStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text_primary,
        headerTitleStyle: {
          color: theme.text_primary,
          fontWeight: "500",
          fontFamily: "Montserrat-Regular",
        },
      }}
    >
      <ExerciseStack.Screen name="Exercises" component={ExercisesPage} />
      <ExerciseStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
      />
    </ExerciseStack.Navigator>
  );
};

export default ExerciseScreenStack;
