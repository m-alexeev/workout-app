import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from '../../../../components/atoms/CustomText';

export interface IExerciseHistoryProps {

}

const ExerciseHistory:React.FC<IExerciseHistoryProps> = ({}) => {
  return(
    <CustomText>History</CustomText>
  )
}

const styles = StyleSheet.create({

});

export default ExerciseHistory;