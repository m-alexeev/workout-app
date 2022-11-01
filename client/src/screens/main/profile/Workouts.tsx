import React from 'react';
import { View } from 'react-native';
import CustomText from '../../../components/atoms/CustomText';
import { useTheme } from '../../../contexts/theme';

export interface IWorkoutsProps {
  
};

const Workouts: React.FC<IWorkoutsProps> = () => {
  const {theme} = useTheme();

  return (
    <View>
      <CustomText>Workouts</CustomText>
    </View>
  )
}

export default Workouts;