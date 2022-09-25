import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button_C from "../../../components/atoms/Button_C";
import CustomText from "../../../components/atoms/CustomText";
import { useTheme } from "../../../contexts/theme";
import { ExercisesStackParamList } from "../../../types/navigation";


type FilterModalNavProp = NativeStackNavigationProp<ExercisesStackParamList, "FilterModal">;

export interface IFilterModalProps {
  navigation: FilterModalNavProp;
}

const FilterModal: React.FC<IFilterModalProps> = ({navigation}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={true}
        onRequestClose={() => {
          navigation.goBack();
        }}
      >
        <View>
          <CustomText>Filter</CustomText>
          <Button_C title="Close" onPress={() => navigation.goBack()}/>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default FilterModal;