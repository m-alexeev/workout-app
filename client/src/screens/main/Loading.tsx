import React, { Dispatch } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import "firebase/compat/auth";

export interface ILoadingScreenInterface {}

const LoadingScreen: React.FC<ILoadingScreenInterface> = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="titleMedium">Loading Application...</Text>
      <ActivityIndicator style={styles.icon} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: "center",
  },
  icon:{ 
    margin: 'auto',
    marginTop: 10,
  }
})

export default LoadingScreen;
