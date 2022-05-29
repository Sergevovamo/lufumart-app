import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
	Platform,
	StyleSheet,
	ScrollView,
	StatusBar,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';
import { loginUser } from '../../store/actions/auth-actions';
import { clearErrors } from '../../store/actions/error-actions';
import { styles } from './styles';

import TextInputAvoidingView from '../../components/KeyboardAvoidingWrapper';

const { width, height } = Dimensions.get('screen');

const Login = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	let error = useSelector((state) => state.error);

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (data) => {
		// Attempt to authenticate user
		setButtonLoading(true);
		await dispatch(loginUser(data));
		// Hide login screen
		navigation.goBack();
	};

	useEffect(() => {
		// Check for register error
		if (error.id === 'LOGIN_FAIL') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				text1: 'Invalid credentials. Please try again!',
				text2: 'Either your email address or password is incorrect.',
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<TextInputAvoidingView>
			<ScrollView alwaysBounceVertical={false} bounces={false}>
				<View style={style.container}>
					<View style={styles.centerAlign}>
						<View style={styles.inputContainer}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									textAlign: 'center',
								}}
							>
								SIGN IN
							</Text>
							<Controller
								control={control}
								type="email"
								name="email"
								render={({ field: { onChange, value, onBlur } }) => (
									<TextInput
										mode="outlined"
										keyboardType="email-address"
										label="Email address"
										placeholder="Enter your email address"
										value={value}
										theme={{
											colors: {
												primary: '#f68b1e',
												underlineColor: 'transparent',
											},
										}}
										onBlur={onBlur}
										onChangeText={(value) => onChange(value)}
									/>
								)}
								rules={{
									required: {
										value: true,
										message: 'Email address is required',
									},
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
								}}
							/>
							<HelperText type="error" style={styles.helper}>
								{errors?.email?.message}
							</HelperText>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value, onBlur } }) => (
									<TextInput
										mode="outlined"
										label="Password"
										secureTextEntry={showPassword ? false : true}
										placeholder="Enter password"
										value={value}
										theme={{
											colors: {
												primary: '#f68b1e',
												underlineColor: 'transparent',
											},
										}}
										onBlur={onBlur}
										onChangeText={(value) => onChange(value)}
										right={
											<TextInput.Icon
												onPress={togglePassword}
												name={showPassword ? 'eye-off' : 'eye'}
											/>
										}
									/>
								)}
								rules={{
									required: {
										value: true,
										message: 'Password is required',
									},
									minLength: {
										value: 8,
										message: 'Password should be atleast 8 characters',
									},
								}}
							/>
							<HelperText type="error">{errors?.password?.message}</HelperText>

							<TouchableOpacity
								onPress={handleSubmit(onSubmit)}
								style={style.button}
							>
								{buttonLoading ? (
									<ActivityIndicator color="#fff" size="small" />
								) : (
									<Text style={{ color: '#fff', fontSize: 18 }}>Sign in</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							marginTop: 40,
							marginBottom: Platform.OS === 'ios' ? 80 : 40,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							style={{
								width: Platform.OS === 'ios' ? 230 : 170,
								height: Platform.OS === 'ios' ? 36 : 26,
							}}
							source={{
								uri: 'https://res.cloudinary.com/lufumart-ecommerce/image/upload/q_auto/c_scale,w_499,h_78/v1649943020/lufumart-logo/Lufumart_Logo_owimai.png',
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</TextInputAvoidingView>
	);
};

export default Login;

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fffff7',
	},
	button: {
		width: '100%',
		height: 60,
		padding: 15,
		marginVertical: 15,
		backgroundColor: '#00ab55',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
});
