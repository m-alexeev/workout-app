import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from "react-native";
import IconButton from "./IconButton";
import CustomText from "./CustomText";
import { useTheme } from "../../contexts/theme";

export interface ISearchBarInputProps extends TextInputProps {
  onCancel: () => void;
  style?: TextStyle | TextStyle[];
  onFocus?: () => {};
}

const SearchBarInput: React.FC<ISearchBarInputProps> = ({
  style,
  onCancel,
  ...props
}) => {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onChangeText={(text) => setInputText(text)}
        autoCorrect={true}
        placeholderTextColor={theme.text_secondary}
        placeholder="Search..."
        onBlur={() => setIsFocused(false)}
        blurOnSubmit
        style={[styles.input, passedStyles, { color: theme.text_primary }]}
        value={inputText}
      />
      <IconButton
        iconName="close"
        onPress={() => {
          onCancel(); 
          setInputText("");
        }}
        color={theme.text_primary}
        size={18}
        
      ></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  input: {},
  icon: {},
});


export default SearchBarInput;