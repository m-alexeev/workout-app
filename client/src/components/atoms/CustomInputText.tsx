import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from './CustomText';
import { useTheme } from '../../contexts/theme';

export interface ICustomTextInputProps extends TextInputProps {
  style?: TextStyle | TextStyle[]
  label?: string,
  iconName?: string,
  password?: boolean,
  error?: string,
  onFocus?: () => {},
}

const CustomInputText: React.FC<ICustomTextInputProps> = (
  {
    style,
    label,
    iconName,
    password,
    error,
    onFocus,
    ...props 
  }) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(password || false);
  const [isFocused, setIsFocused] = useState(false);

  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style
  return (
    <View style={{ marginBottom: 20 }}>
      <CustomText>{label}</CustomText>
      <View style={
            [ styles.inputContainer, 
              { borderColor: error ? theme.primary: isFocused ? theme.primary : theme.secondary }
            ]}>
        {iconName &&
          <Icon name={iconName} style={{fontSize:22, marginRight: 22}} color={theme.text_primary} />
        }
        <TextInput
          onFocus={() => {
            // onFocus();
            setIsFocused(true)
          }}
          {...props}
          placeholderTextColor={theme.text_secondary}
          autoCorrect={false}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={showPassword}
          blurOnSubmit
          style={[styles.input, passedStyles, { color: theme.text_primary }]}
        />
        {password && (
          <Icon
            style={{fontSize: 22}}
            color={theme.text_primary}
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'eye' : 'eye-off-outline'}
          />
        )}
      </View>
      {error &&
        <CustomText style={{marginTop: 7, color: theme.error , fontSize: 12}}>{error}</CustomText>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  }
  ,
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    borderBottomWidth: 2,
    height: 55,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  }
})


export default CustomInputText;