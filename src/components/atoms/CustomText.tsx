import { useTheme } from '../../contexts/theme';
import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';

export interface ICustomTextProps extends TextProps {
  children: any,
  textType?: 'regular' | 'light' | 'bold'
  style?: TextStyle | TextStyle []
}

const CustomText: React.FC<ICustomTextProps> = ({children, textType, style, ...props }) => {
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
  let textStyle = styles.regular;
  switch(textType){
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'light':
      textStyle = styles.light;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
  }
  const {theme} = useTheme();
  return(
    <Text style={[textStyle, {color: theme.text_primary,...passedStyles}]} {...props}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Montserrat-Regular'
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  light: {
    fontFamily: 'Montserrat-Light',
  }
})


export default CustomText;