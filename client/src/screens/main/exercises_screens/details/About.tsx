import React from 'react';
import { StyleSheet } from 'react-native';
import CustomText from '../../../../components/atoms/CustomText';

export interface IExerciseAboutProps {

}

const ExerciseAbout:React.FC<IExerciseAboutProps> = ({}) => {
  return(
    <CustomText>About</CustomText>
  )
}

const styles = StyleSheet.create({

});

export default ExerciseAbout;