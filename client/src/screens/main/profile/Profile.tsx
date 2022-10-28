import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../../../components/atoms/CustomText";
import IconLink from "../../../components/molecules/IconLink";
import ProfileTitle from "../../../components/organisms/ProfileTitle";
import { useTheme } from "../../../contexts/theme";
import { useAppSelector } from "../../../redux/hooks";
import { ProfileStackParamList } from "../../../types/navigation";

type ProfileScreenProp = NativeStackScreenProps<
  ProfileStackParamList,
  "ProfileLanding"
>;

export interface IProfileScreenProps {
  navigation: ProfileScreenProp["navigation"];
}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation }) => {
  const [userInfo, setUserInfo ] = useState({f_name: "", l_name: "", email: ""})
  
  const { theme } = useTheme();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() =>{
    if (user){
      setUserInfo({
        f_name: user.first_name,
        l_name: user.last_name,
        email: user.email,
      });
    }
  },[user])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ProfileTitle
        f_name={userInfo.f_name}
        l_name={userInfo.l_name}
        email={userInfo.email}
      ></ProfileTitle>
      <CustomText>Details</CustomText>
      <IconLink icon="analytics" text="Records"/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
