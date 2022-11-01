import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "../atoms/CustomText";

export interface IIconLinkProps extends TouchableOpacityProps {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const IconLink: React.FC<IIconLinkProps> = ({ text, icon, ...props }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={[styles.icon, { backgroundColor: theme.surface }]}>
            <Ionicons
              size={24}
              color={theme.text_primary}
              name={icon}
            ></Ionicons>
          </View>
          <CustomText style={[styles.text, {}]}>{text}</CustomText>
        </View>
        <View style={styles.chevron}>
          <Ionicons
            style={{ opacity: 0.7 }}
            size={20}
            name="md-chevron-forward"
            color={theme.text_primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  main: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginStart: 20,
  },
  chevron: {
    justifyContent: "center",
    marginEnd: 10,
  },
});

export default IconLink;
