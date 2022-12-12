import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "../types/navigation";
import AuthStackScreen from "./auth";
import MainStackScreen from "./main";
import { useFonts } from "expo-font";
import { type } from "../theme/fonts";
import LoadingScreen from "./main/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { rehydrate } from "../services/auth.service";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackScreen: React.FC = () => {
  let [fontsLoaded] = useFonts(type);

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rehydrate());
  },[])


  if (!fontsLoaded || user.status === 'loading') {
    return <LoadingScreen />;
  }


  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user.isLoggedIn ? (
        <RootStack.Screen name="MainStackRoute" component={MainStackScreen} />
      ) : (
        <RootStack.Screen name="AuthStackRoute" component={AuthStackScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
