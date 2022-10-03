import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ButtonProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "./CustomText";

export interface IToggleButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
  style?: ViewStyle | ViewStyle[];
  toggled: boolean
}

const ToggleButton: React.FC<IToggleButtonProps> = ({
  type,
  style,
  title,
  toggled,
  ...props
}) => {
  const { theme } = useTheme();
  let theme_color = theme.surface;

  switch (type) {
    case "secondary":
      theme_color = theme.secondary;
      break;
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, { backgroundColor: theme_color, borderColor: theme.primary}]}
    >
      {toggled &&
        <Ionicons name='checkmark' color={theme.primary} size={18}/>
      }
      <CustomText style={{fontSize: 12}}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2, 
    borderRadius: 20,
    flexDirection: 'row', 
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
});

export default ToggleButton;
