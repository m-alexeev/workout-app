import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import Button_C from "../../../components/atoms/Button_C";
import CustomText from "../../../components/atoms/CustomText";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import {
  exercise_muscle_groups,
  exercise_types,
} from "../../../models/exercise_list";
import ToggleButton from "../../../components/atoms/ToggleButton";

type FilterModalNavProp = NativeStackNavigationProp<
  ExercisesStackParamList,
  "FilterModal"
>;

export interface IFilterModalProps {
  navigation: FilterModalNavProp;
}

const FilterModal: React.FC<IFilterModalProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="fade"
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}
      transparent
    >
      <View style={{ backgroundColor: theme.background }}>
        <CustomText>Filter</CustomText>
        <CustomText>Exercise Types</CustomText>
        <View style={styles.buttons}>
          {exercise_types.map((type, index) => {
            return (
              <View style={{ margin: 5 }} key={index}>
                <ToggleButton toggled key={index} title={type} />;
              </View>
            );
          })}
        </View>
        <CustomText>Muscle Groups</CustomText>
        <View style={styles.buttons}>
          {exercise_muscle_groups.map((type, index) => {
            return (
              <View style={{ margin: 5 }} key={index}>
                <ToggleButton toggled key={index} title={type} />
              </View>
            );
          })}
        </View>
        <Button_C title="Close" onPress={() => navigation.goBack()} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    direction: "inherit",
    flexDirection: "row",
  },
});

export default FilterModal;
