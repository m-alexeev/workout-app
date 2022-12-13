import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExercisesStackParamList } from "../../../types/navigation";
import { TextInput, useTheme, Button } from "react-native-paper";
import {
  exerciseMuscleGroup,
  exerciseType,
  exerciseMuscleGroupList,
  exerciseTypeList,
} from "../../../types/exercise";
import ChipPicker from "../../../components/organisms/ChipPicker";
import { Keyboard } from "react-native";
import DismissKeyboard from "../../../components/organisms/DismissKeyboard";
import { useAppDispatch } from "../../../redux/hooks";
import { createExercise } from "../../../services/exercise.service";
import { Exercise } from "../../../redux/types/exercise.types";
import { type } from "../../../theme/fonts";

type ExerciseModalNavProp = NativeStackNavigationProp<
  ExercisesStackParamList,
  "ExerciseCreate"
>;

export interface IExerciseForm {
  name: string;
  type?: exerciseType;
  group?: exerciseMuscleGroup;
}

export interface IExerciseModalProp {
  navigation: ExerciseModalNavProp;
}

const ExerciseCreate: React.FC<IExerciseModalProp> = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IExerciseForm>({
    name: "",
    type: undefined,
    group: undefined,
  });
  
  const submit = () => {
    if (form.type && form.group){

      // Create new exercise
      const exercise: Exercise = {
        id: -1,
        name: form.name,
        category: form.type,
        body_part: form.group,
        canDelete: true,
      }
      dispatch(createExercise(exercise));

      // Route back to Exercise Screen
      navigation.goBack();
    }
  }

  const handleInput = (text: string, field: 'name' | "type" | "group") => {
    setForm((prevState) => ({...prevState, [field]: text}));
  }


  return (
    <DismissKeyboard>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.textInput}>
          <TextInput
            onBlur={() => Keyboard.dismiss}
            label="Name"
            mode="outlined"
            value={form.name}
            onChangeText={(text) => handleInput(text, 'name')}
          />
        </View>
        <View style={styles.chips}>
          <ChipPicker
            active={form.type}
            header="Exercise Type"
            setChip={(input) => handleInput(input, 'type')}
            chips={exerciseTypeList}
          />
        </View>
        <View style={styles.chips}>
          <ChipPicker
            active={form.group}
            header="Muscle Group"
            setChip={(input) => handleInput(input, 'group')}
            chips={exerciseMuscleGroupList}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={!form.group || !form.type || !form.name.length}
            mode="contained"
            onPress={submit}
          >
            Create
          </Button>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    marginTop: 15,
    marginHorizontal: 25,
  },
  chips: {
    marginVertical: 5,
  },
  textInput: {
    marginVertical: 10,
  }
});

export default ExerciseCreate;
