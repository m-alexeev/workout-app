import * as React from 'react'
import {Text, View} from 'react-native'

export interface IHomePageProps { }

const HomePage: React.FC<IHomePageProps> = (props) => {
	return (
		<View>
      <Text>Home Page</Text>
    </View>
	)
};

export default HomePage;
