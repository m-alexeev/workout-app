import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  MainStackRoute: undefined,
  AuthStackRoute: undefined,
};

export type AuthStackParamList  = {
  Home: undefined, 
  Login: undefined, 
  Register: undefined,
  Logout: undefined,
}

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
