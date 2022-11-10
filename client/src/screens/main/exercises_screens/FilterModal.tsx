import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Button, Text } from "react-native-paper";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";
import {
  exercise_muscle_groups,
  exercise_types,
} from "../../../models/exercise_list";
import CheckboxButton from "../../../components/atoms/ToggleButton";

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
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={true}
          onDismiss={() => {
            navigation.goBack();
          }}
        >
          <View
            style={{
              flexDirection: "column",
              backgroundColor: theme.background,
            }}
          >
            <Text>Filter</Text>
            <Text>Exercise Types</Text>
            <View style={styles.buttons}>
              {exercise_types.map((type, index) => {
                return (
                  <View style={{ margin: 5 }} key={index}>
                    <CheckboxButton key={index} value={type} />
                  </View>
                );
              })}
            </View>
            <Text>Muscle Groups</Text>
            <View style={styles.buttons}>
              {exercise_muscle_groups.map((type, index) => {
                return (
                  <View style={{ margin: 5 }} key={index}>
                    <CheckboxButton  key={index} value={type} />
                  </View>
                );
              })}
            </View>
            <Button mode="elevated" onPress={() => navigation.goBack()}>Close</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
    padding: 25,
    backgroundColor: "#111111EE",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FilterModal;
