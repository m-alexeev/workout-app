import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from '../../../../components/atoms/CustomText';

export interface IExerciseChartProps {

}

const ExerciseCharts:React.FC<IExerciseChartProps> = ({}) => {
  return(
    <CustomText>Charts</CustomText>
  )
}

const styles = StyleSheet.create({

});

export default ExerciseCharts;