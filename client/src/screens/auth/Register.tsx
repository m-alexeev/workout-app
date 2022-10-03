import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Button_C from "../../components/atoms/Button_C";
import CustomInputText from "../../components/atoms/CustomInputText";
import CustomText from "../../components/atoms/CustomText";
import LinkText from "../../components/atoms/LinkText";
import { useTheme } from "../../contexts/theme";
import { AuthScreenNavigationProp } from "../../types/navigation";

export interface IRegisterScreenProps {
  navigation: AuthScreenNavigationProp,
}

const RegisterScreen: React.FC<IRegisterScreenProps> = ({ navigation }) => {
  const {theme} = useTheme();


  return (
    <SafeAreaView style={{backgroundColor: theme.background, flex: 1}}>
      <View style={styles.container}>
        <CustomText style={{color: theme.text_primary}}>Register Screen</CustomText>
        <CustomInputText
          placeholder="First Name"
          label="First Name"
        />
        <CustomInputText
          placeholder="Last Name"
          label="Last Name"
        />
        <CustomInputText
          placeholder="Email"
          iconName="email"
          label="Email"
        />
        <CustomInputText
          placeholder="Password"
          label="Password"
          iconName="lock"
          password
        />
        <CustomInputText
          placeholder="Confirm Password"
          label="Confirm Password"
          iconName="lock"
          password
        />
        <Button_C title="Register" type="primary"/>
      </View>
      <LinkText onPress={() => navigation.navigate("Login")}>Login Screen</LinkText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

})

export default RegisterScreen;