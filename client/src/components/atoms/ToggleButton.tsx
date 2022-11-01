import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Checkbox, ToggleButtonProps } from "react-native-paper";

export interface IToggleButtonProps extends ToggleButtonProps {
  value: string;
}

const ToggleButton: React.FC<IToggleButtonProps> = ({ value, ...props }) => {
  const [status, setStatus] = useState(false);

  const onToggle = () => {
    setStatus(!status);
  };

  return (
    <View style={styles.button}>
      <Text>{value}</Text>
      <Checkbox
        {...props}
        status={status ? "checked" : "unchecked"}
        onPress={onToggle}
      ></Checkbox>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
});

export default ToggleButton;
