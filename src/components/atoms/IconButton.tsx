import React from "react";
import {
  ButtonProps,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/theme";
import { FontAwesome } from "@expo/vector-icons";

export interface IIconButtonProps extends Omit<ButtonProps, "title"> {
  iconName: keyof typeof FontAwesome.glyphMap;
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

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity style={[passedStyles, styles.container]} {...props}>
      <FontAwesome name={iconName} color={iconColor} size={size}></FontAwesome>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default IconButton;
