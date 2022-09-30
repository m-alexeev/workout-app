import React from "react";
import {
  ButtonProps,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/theme";
import { Ionicons } from "@expo/vector-icons";

export interface IIconButtonProps extends Omit<ButtonProps, "title"> {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle | ViewStyle[];
}

const IconButton: React.FC<IIconButtonProps> = ({
  iconName,
  size,
  color,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  let iconColor = color ? color : theme.text_primary;
  let iconSize = size ? size: 16;

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity style={[passedStyles, styles.container]} {...props}>
      <Ionicons name={iconName} color={iconColor} size={iconSize}></Ionicons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
});

export default IconButton;
