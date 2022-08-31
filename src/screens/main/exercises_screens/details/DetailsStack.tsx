import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export interface IExerciseDetailsStackProps {}

const ExerciseDetailsStack = createMaterialTopTabNavigator();

const ExerciseDetailsScreenStack: React.FC<IExerciseDetailsStackProps> = (props) => {
  return (
    <ExerciseDetailsStack.Navigator></ExerciseDetailsStack.Navigator>
  )
}