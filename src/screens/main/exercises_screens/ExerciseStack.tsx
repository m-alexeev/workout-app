import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import ExerciseDetails from "./ExerciseDetails";
import ExercisesPage from "./Exercises";

export interface IExerciseScreenStackProps {}

const ExerciseStack = createNativeStackNavigator<ExercisesStackParamList>();

const ExerciseScreenStack: React.FC<IExerciseScreenStackProps> = (props) => {
  const {theme} = useTheme();

  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen name="ExerciseList" component={ExercisesPage}
        options={{
          header: (props) => <TitleBar title="Exercises" {...props} search/>
        }}
      />
      <ExerciseStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{
          header: (props) => <TitleBar title="Details" {...props}/>
        }}
      />
    </ExerciseStack.Navigator>
  );
};

export default ExerciseScreenStack;
