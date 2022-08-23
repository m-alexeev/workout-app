import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import * as React from 'react'
import {Text, View} from 'react-native'
import { MainBottomTabParamList } from '../../types/navigation';


type ExercisesScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Exercises">


export interface IExercisesPageProps {
	navigation: ExercisesScreenProp
}

const ExercisesPage: React.FC<IExercisesPageProps> = ({navigation}) => {
	return (
		<View>
      <Text>Exercises Page</Text>
    </View>
	)
};

export default ExercisesPage;
