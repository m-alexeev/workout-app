import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button_C from "../../components/atoms/Button_C";
import { useTheme } from "../../contexts/theme";
import { logout } from "../../redux/actions/auth.actions";
import { useAppDispatch } from "../../redux/hooks";
import { MainBottomTabParamList } from "../../types/navigation";

type HomeScreenProp = BottomTabNavigationProp<MainBottomTabParamList, "Home">;

export interface IHomePageProps {
  navigation: HomeScreenProp;
}

const HomePage: React.FC<IHomePageProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View>
        <Text>Home Page</Text>
      </View>

      <View>
        <Button_C title="Logout" onPress={handleLogout}/>
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
