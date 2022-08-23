import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import * as React from 'react'
import {Text, View} from 'react-native'
import { MainBottomTabParamList } from '../../types/navigation';


type HomeScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Home">


export interface IHomePageProps {
	navigation: HomeScreenProp
}

const HomePage: React.FC<IHomePageProps> = ({navigation}) => {
	return (
		<View>
      <Text>Home Page</Text>
    </View>
	)
};

export default HomePage;
