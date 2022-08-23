import React, { useState } from 'react';
import { View,  Keyboard, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button_C from '../../components/atoms/Button_C';
import CustomInputText from '../../components/atoms/CustomInputText';
import CustomText from '../../components/atoms/CustomText';
import LinkText from '../../components/atoms/LinkText';
import SocialButton from '../../components/atoms/SocialButton';
import { useTheme } from '../../contexts/theme';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../types/navigation';
import { CompositeNavigationProp } from '@react-navigation/native';

type LoginScreenNavProp = CompositeNavigationProp<
	NativeStackNavigationProp<RootStackParamList, "AuthStackRoute">,
	NativeStackNavigationProp<AuthStackParamList, "Login">
>;

export interface ILoginScreenProps  {
	navigation: LoginScreenNavProp
};

const LoginScreen: React.FC<ILoginScreenProps> = ({ navigation }) => {
	const { theme } = useTheme();
	const [inputs, setInputs] = useState({ 'email': '', 'password': '' })
	const [errors, setErrors] = useState({ 'email': undefined, 'password': undefined });
	const [loading, setLoading] = useState(false);

	const validate = (): boolean => {
		Keyboard.dismiss();

		//reset errors
		handleError("", "email");
		handleError("", "password");

		let isValid = true;
		if (!inputs.email) {
			handleError("Input Email", "email");
			isValid = false;
		}
		if (!inputs.password) {
			handleError("Input Password", "password");
			isValid = false;
		}
		return isValid;
	}

	const handleError = (error: string, input: string) => {
		setErrors(prevState => ({ ...prevState, [input]: error }))
	}
	const handleOnChange = (text: string, input: string) => {
		setInputs(prevState => ({ ...prevState, [input]: text }));
	}

	const login = () => {
		const valid = validate();
		if (valid) {
			setLoading(true);
			//Login
			firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password).then((user) => {
				// Save user to local storage ? 
			}).catch((error) => {
				console.log(error);
				console.log(error.code);
			}).finally(() => {
				setLoading(false);
			})
		}
	}

	const handleRegisterPress = () => {
		navigation.navigate("Register");
	}


	return (
		<SafeAreaView style={{ backgroundColor: theme.background, flex: 1, }}>
			<View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
				<CustomText style={{ color: theme.text_primary }}>Login Page</CustomText>
				<CustomInputText
					onChangeText={text => handleOnChange(text, 'email')}
					placeholder='Email Address'
					iconName='email'
					label='Email'
					error={errors.email}
				/>
				<CustomInputText
					onChangeText={text => handleOnChange(text, 'password')}
					placeholder="Password"
					iconName='lock'
					label="Password"
					error={errors.password}
					password
				/>
				<Button_C title='Login' loading={loading} onPress={login} type='primary'/>
				<View style={styles.link}>
					<CustomText>Need an Acount?</CustomText>
					<LinkText onPress={handleRegisterPress} style={{ marginLeft: 10 }}>
						Register
					</LinkText>
				</View>
			</View>
			<View >
				<CustomText style={{ fontSize: 18, textAlign: 'center' }}>Social Login</CustomText>
				<View style={styles.socialContainer}>
					<SocialButton size={25} iconName='google-plus-g'></SocialButton>
				</View>
			</View>
		</SafeAreaView>
	)
};

const styles = StyleSheet.create({
	link: {
		flex: 1,
		flexDirection: "row",
		marginTop: 15,
		justifyContent: 'center'
	},
	socialContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'space-evenly',
		paddingHorizontal: 15,
	}
})

export default LoginScreen;
