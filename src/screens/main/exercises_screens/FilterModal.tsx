import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button_C from "../../../components/atoms/Button_C";
import CustomText from "../../../components/atoms/CustomText";
import { useTheme } from "../../../contexts/theme";

export interface IFilterModalProps {
  open: boolean
}

const FilterModal: React.FC<IFilterModalProps> = ({open}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(open);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View>
          <CustomText>Filter</CustomText>
          <Button_C title="Close" onPress={() => setIsOpen(!isOpen)} />
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
