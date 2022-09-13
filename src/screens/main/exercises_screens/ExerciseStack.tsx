import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import ExerciseDetailsScreenStack from "./details/DetailsStack";
import ExercisesPage from "./Exercises";
import { MaterialIcons, Feather, Octicons } from "@expo/vector-icons";
import IconButton from "../../../components/atoms/IconButton";

export interface IExerciseScreenStackProps {}

const ExerciseStack = createNativeStackNavigator<ExercisesStackParamList>();

const ExerciseScreenStack: React.FC<IExerciseScreenStackProps> = (props) => {
  const { theme } = useTheme();

  const exercisePageIcons = () => {
    return (
      <>
        <IconButton iconName="filter" size={16}></IconButton>
        <IconButton iconName="plus" size={16}></IconButton>
      </>
    );
  };

  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen
        name="ExerciseList"
        component={ExercisesPage}
        options={{
          header: (props) => (
            <TitleBar
              title="Exercises"
              search
              optionsMenu={exercisePageIcons()}
              {...props}
            />
          ),
        }}
      />
      <ExerciseStack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreenStack}
        options={{
          header: (props) => <TitleBar title="Details" {...props} />,
        }}
      />
    </ExerciseStack.Navigator>
  );
};

export default ExerciseScreenStack;
