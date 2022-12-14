import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import ExerciseDetailsScreenStack from "./details/DetailsStack";
import ExercisesPage from "./Exercises";
import { IconButton} from "react-native-paper";
import { StyleSheet } from "react-native";
import FilterModal from "./FilterModal";
import ExerciseCreate from "./ExerciseCreate";

const ExerciseStack = createNativeStackNavigator<ExercisesStackParamList>();

type ExerciseScreenNavProp = NativeStackNavigationProp<
  ExercisesStackParamList,
  "ExerciseList"
>;

export interface IExerciseScreenStackProps {
  navigation: ExerciseScreenNavProp;
}

const ExerciseScreenStack: React.FC<IExerciseScreenStackProps> = (props) => {
  const { theme } = useTheme();

  const exercisePageIcons = () => {
    return (
      <>
        <IconButton
          style={styles.icons}
          icon="filter"
          onPress={() => props.navigation.navigate("FilterModal")}
        ></IconButton>
        <IconButton
          style={styles.icons}
          icon="plus"
          onPress={() => props.navigation.navigate("ExerciseCreate")}
        ></IconButton>
      </>
    );
  };

  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Group>
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
        <ExerciseStack.Screen
          name="ExerciseCreate"
          component={ExerciseCreate}
          options={{
            header: (props) => <TitleBar title="New" {...props} />,
          }}
        />
      </ExerciseStack.Group>
      <ExerciseStack.Group
        screenOptions={{
          presentation: "containedTransparentModal",
          headerShown: false,
        }}
      >
        <ExerciseStack.Screen
          name="FilterModal"
          component={FilterModal}
        ></ExerciseStack.Screen>
      </ExerciseStack.Group>
    </ExerciseStack.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    marginHorizontal: 5,
  },
});

export default ExerciseScreenStack;
