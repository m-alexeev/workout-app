import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from '../../../../components/atoms/CustomText';

export interface IExerciseRecordProps {

}

const ExerciseRecords:React.FC<IExerciseRecordProps> = ({}) => {
  return(
    <CustomText>Records</CustomText>
  )
}

const styles = StyleSheet.create({

});

export default ExerciseRecords;