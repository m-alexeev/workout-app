import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import TitleBar from "../../../components/organisms/TitleBar";
import { useTheme } from "../../../contexts/theme";
import { ProfileStackParamList } from "../../../types/navigation";
import ProfileScreen from "./Profile";
import Records from "./Records";
import Workouts from "./Workouts";

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
      />
      <ProfileStack.Screen
        name="Records"
        component={Records}
        options={{ header: (props) => <TitleBar title="Records" {...props} /> }}
      />
      <ProfileStack.Screen
        name="Workouts"
        component={Workouts}
        options={{ header: (props) => <TitleBar title="Workouts" {...props} /> }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreenStack;
