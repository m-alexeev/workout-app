import React, { useState } from "react";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "../../types/navigation";
import { useAppDispatch } from "../../redux/hooks";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import DismissKeyboard from "../../components/organisms/DismissKeyboard";
import { createLocalUser } from "../../services/auth.service";

type LocalUserCreateNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, "AuthStackRoute">,
  NativeStackNavigationProp<AuthStackParamList, "LocalUser">
>;

export interface ILocalUserCreateProps {
  navigation: LocalUserCreateNavProp;
}

const LocalUserCreateScreen: React.FC<ILocalUserCreateProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    height: 0,
    weight: 0,
  });
  const [errors, setErrors] = useState({
    first_name: undefined,
    last_name: undefined,
    height: undefined,
    weight: undefined,
  });
  const [loading, setLoading] = useState(false);
  const validate = (): boolean => {
    let valid = true;
    Keyboard.dismiss();
    handleError(undefined, "first_name");
    handleError(undefined, "last_name");
    handleError(undefined, "height");
    handleError(undefined, "weight");

    if (!inputs.first_name) {
      handleError("Enter first name", "first_name");
      valid= false;
    }
    if (!inputs.last_name) {
      valid= false;
      handleError("Enter last name", "last_name");
    }
    if (!inputs.height) {
      valid= false;
      handleError("Enter your height", "height");
    }
    if (!inputs.weight) {
      valid= false;
      handleError("Enter your weight", "weight");
    }
    if (isNaN(inputs.weight)) {
      valid= false;
      handleError("Weight must be a number", "weight");
    }
    if (isNaN(inputs.height)) {
      valid= false;
      handleError("Height must be a number", "height");
    }
    return valid;
  };

  const create = () => {
    const valid = validate();
    
    if (valid) {
      setLoading(true);
      dispatch(createLocalUser(inputs))
      setLoading(false);
    }
  };
  

  const handleError = (
    error: string | undefined,
    input: keyof typeof errors
  ) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const handleOnChange = (text: string, input: keyof typeof inputs) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="headlineMedium">Create Profile</Text>
          </View>

          <View style={styles.inputs}>
            <View style={styles.textInput}>
              <TextInput
                label="First Name"
                onChangeText={(txt) => handleOnChange(txt, "first_name")}
                error={errors.first_name}
              ></TextInput>
              {errors.first_name && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.first_name}
                </Text>
              )}
            </View>
            <View style={styles.textInput}>
              <TextInput
                label="Last Name"
                onChangeText={(txt) => handleOnChange(txt, "last_name")}
                error={errors.last_name}
              ></TextInput>
              {errors.last_name && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.last_name}
                </Text>
              )}
            </View>
            <View style={styles.textInput}>
              <TextInput
                label="Height"
                onChangeText={(txt) => handleOnChange(txt, "height")}
                error={errors.height}
                keyboardType="numeric"
                right={<TextInput.Affix text="cm" />}
              ></TextInput>
              {errors.height && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.height}
                </Text>
              )}
            </View>
            <View style={styles.textInput}>
              <TextInput
                label="Weight"
                onChangeText={(txt) => handleOnChange(txt, "weight")}
                keyboardType="numeric"
                error={errors.weight}
                right={<TextInput.Affix text="kg" />}
              ></TextInput>
              {errors.weight && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.weight}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.submitButton}>
            <Button mode="contained-tonal" onPress={create} loading={loading}>
              Create
            </Button>
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 20, justifyContent: "center" },
  header: { marginTop: 35, alignItems: "center", marginBottom: 25 },
  inputs: { marginBottom: 10 },
  textInput: { marginBottom: 25 },
  submitButton: { marginHorizontal: 20 },
  error: {},
});

export default LocalUserCreateScreen;
