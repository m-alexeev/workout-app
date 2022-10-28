import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ProfileStackParamList } from "../../../types/navigation";
import ProfileScreen from "./Profile";

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

type ProfileScreenNavProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileLanding"
>;

export interface IProfileScreenStackProps {
  navigation: ProfileScreenNavProp;
}

const ProfileScreenStack: React.FC<IProfileScreenStackProps> = (props) => {
  const { theme } = useTheme();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileLanding"
        component={ProfileScreen}
        options={{ header: (props) => <TitleBar title="Profile" {...props} /> }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileScreenStack;
