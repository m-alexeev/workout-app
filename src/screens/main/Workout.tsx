import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { MainBottomTabParamList } from '../../types/navigation';

type WorkoutScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Workout">;

export interface IWorkoutPageProps{
  navigation: WorkoutScreenProp
}

const WorkoutPage: React.FC<IWorkoutPageProps> = ({navigation}) =>{
  return(
    <SafeAreaView>
      <View>
        <Text>Workout Page</Text>
      </View>
    </SafeAreaView>
  )
}

export default WorkoutPage;