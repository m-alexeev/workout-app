import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/theme";
import { MainBottomTabParamList } from "../../types/navigation";

type HomeScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Home">;

export interface IHomePageProps {
  navigation: HomeScreenProp;
}

const HomePage: React.FC<IHomePageProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View>
        <Text>Home Page</Text>
      </View>

      <View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
		flex: 1,
	},
});

export default HomePage;
