import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

/*
Navigation Map

* App (Stack)
  + Main (Tab Navigator)
    - Home      (Screen)
    - Profile   (Screen)
    - Exercises (Stack)
      - Exercises (Screen)
      - Details   (Screen)
    - History   (Screen)
  + Auth (Stack Navigator)
    - Login     (Screen)
    - Register  (Screen)
    - Reset Pwd (Screen)

*/


export type RootStackParamList = {
  MainStackRoute: undefined,
  AuthStackRoute: undefined,
};


export type MainBottomTabParamList = {
  Home: undefined,
  Profile: undefined,
  Exercises: undefined,
  Statistics: undefined,
  Workout: undefined,
}

export type ExercisesStackParamList = {
  ExerciseList: NavigatorScreenParams<MainBottomTabParamList>,
  ExerciseDetails: {exerciseId: string},
}

export type AuthStackParamList  = {
  Login: undefined, 
  Register: undefined,
  Logout: undefined,
}

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
