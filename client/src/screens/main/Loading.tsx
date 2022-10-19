import React, { Dispatch } from "react";
import { View, ActivityIndicator } from "react-native";
import "firebase/compat/auth";

export interface ILoadingScreenInterface {
  
}

const LoadingScreen: React.FC<ILoadingScreenInterface> = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
