import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "../atoms/CustomText";
import IconButton from "../atoms/IconButton";

export interface ITitleBarProps extends NativeStackHeaderProps{
  title: string;
  optionsMenu?: boolean;
  search?: boolean;
}

const TitleBar: React.FC<ITitleBarProps> = ({ title, optionsMenu, search,...props }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomText style={[styles.title, { color: theme.text_primary }]}>
        {title}
      </CustomText>
      {optionsMenu && (
        <IconButton iconName="gear" color={theme.primary}></IconButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
});

export default TitleBar;
