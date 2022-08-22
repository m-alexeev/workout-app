import React, { VoidFunctionComponent } from 'react';
import CustomText from './CustomText';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../contexts/theme';

export interface ILinkTextInterface extends TouchableOpacityProps { 
  children: any  
}

const LinkText: React.FC<ILinkTextInterface> = ({children, ...props}) => {
  const {theme} = useTheme();
  return(
    <TouchableOpacity {...props} >
      <CustomText style={{color: theme.primary}}>{children}</CustomText>
    </TouchableOpacity>
  )
}

export default LinkText;