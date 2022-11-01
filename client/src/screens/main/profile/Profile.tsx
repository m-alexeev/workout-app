import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, View } from "react-native";
import Button_C from "../../../components/atoms/Button_C";
import CustomText from "../../../components/atoms/CustomText";
import IconLink from "../../../components/molecules/IconLink";
import ProfileTitle from "../../../components/organisms/ProfileTitle";
import { useTheme } from "../../../contexts/theme";
import { logout } from "../../../redux/actions/auth.actions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ProfileStackParamList } from "../../../types/navigation";

type ProfileScreenProp = NativeStackScreenProps<
  ProfileStackParamList,
  "ProfileLanding"
>;

export interface IProfileScreenProps {
  navigation: ProfileScreenProp["navigation"];
}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    f_name: "",
    l_name: "",
    email: "",
  });

  const { theme } = useTheme();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user) {
      setUserInfo({
        f_name: user.first_name,
        l_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ProfileTitle
        f_name={userInfo.f_name}
        l_name={userInfo.l_name}
        email={userInfo.email}
      ></ProfileTitle>
      <View style={styles.routeContainer}>
        <CustomText style={{ fontSize: 18, marginStart: 10 }}>
          Details
        </CustomText>
        <IconLink
          style={styles.route}
          icon="analytics"
          text="Records"
          onPress={() => navigation.navigate("Records")}
        />
        <IconLink
          style={styles.route}
          icon="barbell"
          text="Workouts"
          onPress={() => navigation.navigate("Workouts")}
        />
        <Button_C style={{margin: 10}} title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routeContainer: {
    marginTop: 25,
  },
  route: {
    margin: 10,
  },
});

export default ProfileScreen;
