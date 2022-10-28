import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme';
import CustomText from '../atoms/CustomText';

export interface IProfileCirleProps {
  initial: string
}

const ProfileCircle: React.FC<IProfileCirleProps> = ({initial}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.surface, borderColor: theme.primary,}]}>
      <CustomText style={styles.text}>
        {initial}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  }
})

export default ProfileCircle
