import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "firebase/compat/auth";
import { useFonts } from "expo-font";
import { type } from "./src/theme/fonts";
import AuthStackScreen from "./src/screens/auth";
import LoadingScreen from "./src/screens/main/Loading";
import MainStackScreen from "./src/screens/main";
import { RootStackParamList } from "./src/types/navigation";
import ThemeProvider from "./src/contexts/theme";
import SearchProvider from "./src/contexts/search";
import "./config/firebase";
import { db } from "./config/firebase";
import useAuthentication from "./src/utils/hooks/auth";
import { doc, getDoc } from "firebase/firestore";

export interface IAppProps {}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<IAppProps> = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);
  let [fontsLoaded] = useFonts(type);

  const { user } = useAuthentication();

  if (!user || !fontsLoaded) {
    return <LoadingScreen setLoading={setLoading} setSignedIn={setSignedIn} />;
  }

  return (
    <ThemeProvider>
      <SearchProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
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
