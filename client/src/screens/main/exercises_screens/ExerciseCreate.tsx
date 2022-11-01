import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput, Text } from "react-native-paper";
import { exerciseMuscleGroup, exerciseType } from "../../../types/exercise";

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

  const [form, setForm] = useState<IForm>({
    name: "",
    type: undefined,
    group: undefined,
  });

  const handleNameChange = (text: string) => {
    setForm((prevState) => ({ ...prevState, name: text }));
  };

  const handleTypeChange = (selection: exerciseType) => {
    setForm((prevState) => ({ ...prevState, type: selection }));
  };

  const handleGroupChange = (selection: exerciseMuscleGroup) => {
    setForm((prevState) => ({ ...prevState, group: selection }));
  };

  return (
    <View>
      <Text variant="headlineMedium">Create Exercise</Text>
      <TextInput
        label="Name"
        mode="outlined"
        value={form.name}
        onChangeText={(text) => handleNameChange(text)}
      />
    </View>
  );
};

export default ExerciseCreate;
