import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { ExerciseDetailsParamList } from '../../../../types/navigation';
import ExerciseAbout from './About';
import ExerciseCharts from './Charts';
import ExerciseHistory from './History';
import ExerciseRecords from './Records';

export interface IExerciseDetailsStackProps {}

const ExerciseDetailsStack = createMaterialTopTabNavigator<ExerciseDetailsParamList>();

const ExerciseDetailsScreenStack: React.FC<IExerciseDetailsStackProps> = (props) => {
  return (
    <ExerciseDetailsStack.Navigator>
      <ExerciseDetailsStack.Screen name="About" component={ExerciseAbout}/>
      <ExerciseDetailsStack.Screen name="Charts" component={ExerciseCharts}/>
      <ExerciseDetailsStack.Screen name="History" component={ExerciseHistory}/>
      <ExerciseDetailsStack.Screen name="Records" component={ExerciseRecords}/>
    </ExerciseDetailsStack.Navigator>
  )
}

export default ExerciseDetailsScreenStack;