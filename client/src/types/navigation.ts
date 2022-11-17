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
      - Details   (Tabs)
        - About 
        - History
        - Charts
        - Records
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
  Profile: NavigatorScreenParams<ProfileStackParamList>,
  Exercises: undefined,
  Statistics: undefined,
  Workout: undefined,
}

export type ExercisesStackParamList = {
  ExerciseList: NavigatorScreenParams<MainBottomTabParamList>,
  ExerciseDetails: {exerciseId: string},
  FilterModal: undefined,
  ExerciseCreate: undefined,
}


export type ExerciseDetailsParamList = {
  About: undefined, 
  History: undefined,
  Charts: undefined,
  Records: undefined,
};

export type ProfileStackParamList = {
  ProfileLanding: undefined,
  Exercises: undefined, 
  Workouts: undefined,
  Measurements: undefined,
  Records: undefined,
}

export type AuthStackParamList  = {
  Login: undefined, 
  Register: undefined,
  Logout: undefined,
  LocalUser: undefined,
}

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
