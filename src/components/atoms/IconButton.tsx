import React from "react";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from "../../contexts/theme";


export interface IIconButtonProps extends Omit<ButtonProps, "title"> {
  iconName: string,
  size?: number,
  color?: string,
}

const IconButton: React.FC<IIconButtonProps> = ({iconName, size, color, ...props}) => {
  const {theme} = useTheme();
  let iconColor = color ? color: theme.text_primary; 

  return (
    <TouchableOpacity style={styles.container}  {...props}>
      <Icon name={iconName} color={iconColor} size={size}></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default IconButton;