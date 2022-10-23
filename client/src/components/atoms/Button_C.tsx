import React, { Children } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  ButtonProps,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../contexts/theme";
import CustomText from "./CustomText";

export interface IButtonProps extends ButtonProps {
  type?: "primary" | "secondary";
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const Button_C: React.FC<IButtonProps> = ({
  type,
  style,
  loading,
  ...props
}) => {
  const { theme } = useTheme();
  let theme_color = theme.primary;

  // const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;

  switch (type) {
    case "secondary":
      theme_color = theme.secondary;
      break;
  }

  return (
    <TouchableOpacity
      disabled={loading}
      {...props}
      style={[styles.button, { backgroundColor: theme_color }]}
    >
      {loading && (
        <ActivityIndicator
          style={{ marginRight: 5 }}
          color={theme.text_primary}
        />
      )}
      <CustomText>{props.title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button_C;
