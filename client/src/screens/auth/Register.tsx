import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Keyboard } from "react-native";
import Button_C from "../../components/atoms/Button_C";
import CustomInputText from "../../components/atoms/CustomInputText";
import CustomText from "../../components/atoms/CustomText";
import LinkText from "../../components/atoms/LinkText";
import { useTheme } from "../../contexts/theme";
import { register } from "../../redux/actions/auth.actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AuthScreenNavigationProp } from "../../types/navigation";

export interface IRegisterScreenProps {
  navigation: AuthScreenNavigationProp;
}

const RegisterScreen: React.FC<IRegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [inputs, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    conf_password: "",
  });
  const [errors, setErrors] = useState({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
    conf_password: undefined,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.message);

  const validate = (): boolean => {
    Keyboard.dismiss();
    // Reset errors
    let k: keyof typeof errors;
    for (k in errors) {
      handleError(undefined, k);
    }
    let isValid = true;
    if (!inputs.email) {
      handleError("Input Email", "email");
      isValid = false;
    }
    if (!!inputs.email.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/)) {
      handleError("Input valid email address", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Enter password", "password");
      isValid = false;
    }
    if (!inputs.conf_password) {
      handleError("Confirm password", "conf_password");
      isValid = false;
    }
    if (inputs.conf_password !== inputs.password) {
      handleError("Passwords do not match", "conf_password");
      isValid = false;
    }
    if (!inputs.first_name) {
      handleError("Input first name", "first_name");
      isValid = false;
    }
    if (!inputs.last_name) {
      handleError("Input last name", "last_name");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = () => {
    const valid = validate();
    if (valid) {
      setLoading(true);
      dispatch(
        register(
          inputs.email,
          inputs.password,
          inputs.first_name,
          inputs.last_name
        )
      )
        .then(() => {
          navigation.replace("Login");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleOnChange = (text: string, input: keyof typeof inputs) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (
    error: string | undefined,
    input: keyof typeof inputs
  ) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View style={styles.container}>
        <CustomText style={{ fontSize: 18, color: theme.text_primary }}>
          Register
        </CustomText>
        {message && (
          <CustomText style={{ color: theme.error }}>
            {message.message}
          </CustomText>
        )}
        <CustomInputText
          placeholder="First Name"
          label="First Name"
          iconName="person"
          onChangeText={(text) => handleOnChange(text, "first_name")}
          error={errors.first_name}
        />
        <CustomInputText
          placeholder="Last Name"
          label="Last Name"
          iconName="person"
          onChangeText={(text) => handleOnChange(text, "last_name")}
          error={errors.last_name}
        />
        <CustomInputText
          placeholder="Email"
          iconName="mail"
          label="Email"
          onChangeText={(text) => handleOnChange(text, "email")}
          error={errors.email}
        />
        <CustomInputText
          placeholder="Password"
          label="Password"
          iconName="lock-closed"
          password
          onChangeText={(text) => handleOnChange(text, "password")}
          error={errors.password}
        />
        <CustomInputText
          placeholder="Confirm Password"
          label="Confirm Password"
          iconName="lock-closed"
          password
          onChangeText={(text) => handleOnChange(text, "conf_password")}
          error={errors.conf_password}
        />
        <Button_C
          title="Register"
          type="primary"
          onPress={handleLogin}
          loading={loading}
        />
      </View>
      <View style={{ flex: 1 }}>
        <LinkText
          style={styles.redirect}
          onPress={() => navigation.navigate("Login")}
        >
          Login Screen
        </LinkText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  redirect: {
    flex: 1,
    margin: "auto",
    padding: 5,
    marginTop: 10,
  },
});

export default RegisterScreen;
