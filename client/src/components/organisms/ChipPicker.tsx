import React, { SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, Text } from "react-native-paper";

export interface IChipPickerProps {
  header: string;
  active?: string;
  setChip: (item: string) => void;
  chips: string[];
}

const ChipPicker: React.FC<IChipPickerProps> = ({
  header,
  chips,
  setChip,
  active,
}) => {
  return (
    <View>
      <Text variant="titleMedium">{header}</Text>
      <View style={styles.container}>
        {chips.map((item, index) => {
          return (
            <Chip
              style={{margin: 5}}
              selected={item === active}
              key={index}
              mode="flat"
              onPress={() => setChip(item)}
            >
              {item}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ChipPicker;
