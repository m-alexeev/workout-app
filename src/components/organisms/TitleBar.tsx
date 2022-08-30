import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "../atoms/CustomText";
import IconButton from "../atoms/IconButton";

export interface ITitleBarProps extends NativeStackHeaderProps {
  title: string;
  optionsMenu?: boolean;
  search?: boolean;
}

const TitleBar: React.FC<ITitleBarProps> = ({
  title,
  optionsMenu,
  search,
  ...props
}) => {
  const { theme } = useTheme();
  const navigation = props.navigation;
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {props.back && (
        <IconButton
          iconName="arrow-left"
          color={theme.text_primary}
          size={16}
          onPress={() => navigation.goBack()}
        />
      )}
      <CustomText style={[styles.title, { color: theme.text_primary }]}>
        {title}
      </CustomText>
      <View style={styles.icons}>
        {search && (
          <IconButton iconName="search" color={theme.text_primary} size={16} />
        )}
        {optionsMenu && (
          <IconButton iconName="gear" color={theme.text_primary} size={16} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {},
});

export default TitleBar;
