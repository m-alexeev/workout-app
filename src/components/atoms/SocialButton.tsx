import React from 'react';
import {ButtonProps, StyleSheet, TouchableOpacity, ViewStyle, PixelRatio } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../contexts/theme';

export interface ISocialButtonProps extends Omit<ButtonProps, 'title'>{
  iconName: string
  size: number
  style?: ViewStyle | ViewStyle []
};

const SocialButton: React.FC<ISocialButtonProps> = ({iconName, size, ...props}) => {
  const {theme} = useTheme();

  const passedStyles = Array.isArray(styles) ? Object.assign({}, ...styles) : styles;
  return (
    <TouchableOpacity {...props} style={[styles.button, passedStyles, {backgroundColor: theme.primary}]}>
      <Icon size={size} style={styles.icon} color={theme.text_primary} name={iconName}></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SocialButton;