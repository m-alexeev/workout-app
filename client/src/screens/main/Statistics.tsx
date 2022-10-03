import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import { MainBottomTabParamList } from '../../types/navigation';

type StatisticsScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Statistics">;

export interface IStatisticsPageProps {
  navigation: StatisticsScreenProp
}

const StatisticsPage: React.FC<IStatisticsPageProps> = ({navigation}) =>{
  return(
    <View>
      <Text>Statistics Page</Text>
    </View>
  )
}

export default StatisticsPage;