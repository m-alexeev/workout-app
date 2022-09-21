import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import ExerciseDetailsScreenStack from "./details/DetailsStack";
import ExercisesPage from "./Exercises";
import IconButton from "../../../components/atoms/IconButton";
import {StyleSheet} from 'react-native';

export interface IExerciseScreenStackProps {}

const ExerciseStack = createNativeStackNavigator<ExercisesStackParamList>();

const ExerciseScreenStack: React.FC<IExerciseScreenStackProps> = (props) => {
  const { theme } = useTheme();

  const exercisePageIcons = () => {
    return (
      <>
        <IconButton style={styles.icons} iconName="filter" size={18}></IconButton>
        <IconButton style={styles.icons} iconName="md-add" size={18}></IconButton>
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
              titleBarOptions={exercisePageIcons()}
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

const styles = StyleSheet.create({
  icons: {
    marginHorizontal: 5,
  }
})

export default ExerciseScreenStack;
