import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "../atoms/CustomText";
import ProfileCircle from "../molecules/ProfileCircle";

export interface IProfileTitle {
  f_name: string;
  l_name: string;
}

const ProfileTitle: React.FC<IProfileTitle> = ({ f_name, l_name }) => {
  const { theme } = useTheme();

  const getInitials = (): string => {
    let initials = "";
    if (f_name.length && l_name.length) {
      initials = `${f_name[0]}${l_name[0]}`;
    }
    return initials;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View>
        <ProfileCircle initial={getInitials()}></ProfileCircle>
      </View>
      <View style={styles.info}>
        <CustomText style={styles.name}>{f_name} {l_name}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection:'row',
  },
  info:{
    marginStart: 10,
    justifyContent:'center',
    flexDirection:"column"
  },
  name: {
    opacity: 0.9,
    fontSize: 18,
  },
  email:{
    opacity: 0.9
  }
});

export default ProfileTitle;
