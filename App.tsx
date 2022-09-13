import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebaseConfig } from "./config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useFonts } from "expo-font";
import { type } from "./src/theme/fonts";
import AuthStackScreen from "./src/screens/auth";
import LoadingScreen from "./src/screens/main/Loading";
import MainStackScreen from "./src/screens/main";
import { RootStackParamList } from "./src/types/navigation";
import ThemeProvider from "./src/contexts/theme";
import SearchProvider from "./src/contexts/search";

export interface IAppProps {}

const RootStack = createNativeStackNavigator<RootStackParamList>();

firebase.initializeApp(firebaseConfig);

const App: React.FC<IAppProps> = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);
  let [fontsLoaded] = useFonts(type);

  if (isLoading || !fontsLoaded) {
    return <LoadingScreen setLoading={setLoading} setSignedIn={setSignedIn} />;
  }

  return (
    <ThemeProvider>
      <SearchProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
              <RootStack.Screen
                name="MainStackRoute"
                component={MainStackScreen}
              />
            ) : (
              <RootStack.Screen
                name="AuthStackRoute"
                component={AuthStackScreen}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
