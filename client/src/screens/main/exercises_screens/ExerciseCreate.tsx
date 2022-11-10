import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { ExercisesStackParamList } from "../../../types/navigation";
import { TextInput, Text, useTheme, Button } from "react-native-paper";
import {
  exerciseMuscleGroup,
  exerciseType,
  exerciseMuscleGroupList,
  exerciseTypeList,
} from "../../../types/exercise";
import ChipPicker from "../../../components/organisms/ChipPicker";
import { Keyboard } from "react-native";
import DismissKeyboard from "../../../components/organisms/DismissKeyboard";

type ExerciseModalNavProp = NativeStackNavigationProp<
  ExercisesStackParamList,
  "ExerciseCreate"
>;

interface IForm {
  name: string;
  type?: exerciseType;
  group?: exerciseMuscleGroup;
}

export interface IExerciseModalProp {
  navigation: ExerciseModalNavProp;
}

const ExerciseCreate: React.FC<IExerciseModalProp> = ({ navigation }) => {
  const theme = useTheme();

  const [form, setForm] = useState<IForm>({
    name: "",
    type: undefined,
    group: undefined,
  });

  const handleNameChange = (text: string) => {
    setForm((prevState) => ({ ...prevState, name: text }));
  };

  const handleTypeChange = (selection: string) => {
    setForm((prevState) => ({ ...prevState, type: selection }));
  };

  const handleGroupChange = (selection: string) => {
    setForm((prevState) => ({ ...prevState, group: selection }));
  };

  return (
    <DismissKeyboard>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Text variant="titleMedium">Create Exercise</Text>
        <TextInput
          onBlur={() => Keyboard.dismiss}
          label="Name"
          mode="outlined"
          value={form.name}
          onChangeText={(text) => handleNameChange(text)}
        />
        <ChipPicker
          active={form.type}
          header="Exercise Type"
          setChip={handleTypeChange}
          chips={exerciseTypeList}
        ></ChipPicker>
        <ChipPicker
          active={form.group}
          header="Muscle Group"
          setChip={handleGroupChange}
          chips={exerciseMuscleGroupList}
        ></ChipPicker>
        <Button
          disabled={!form.group || !form.type || !form.name.length}
          mode="contained"
          onPress={() => {}}
        >
          Create
        </Button>
      </View>
    </DismissKeyboard>
  );
};

export default ExerciseCreate;
