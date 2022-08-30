import React from "react";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/theme";
import { FontAwesome } from "@expo/vector-icons";

export interface IIconButtonProps extends Omit<ButtonProps, "title"> {
  iconName: keyof typeof FontAwesome.glyphMap,
  size?: number,
  color?: string,
}

const IconButton: React.FC<IIconButtonProps> = ({iconName, size, color, ...props}) => {
  const {theme} = useTheme();
  let iconColor = color ? color: theme.text_primary; 

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <FontAwesome name={iconName} color={iconColor} size={size}></FontAwesome>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default IconButton;