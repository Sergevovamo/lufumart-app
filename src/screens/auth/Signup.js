import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	Platform,
	StyleSheet,
	StatusBar,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, useTheme } from 'react-native-paper';
import { styles } from './styles';

import TextInputAvoidingView from '../../components/KeyboardAvoidingWrapper';

const { width, height } = Dimensions.get('screen');

const Signup = () => {
	const dispatch = useDispatch();

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
		console.log(data);
		// setButtonLoading(true);
		// await dispatch(loginUser(data));
	};

	return (
		<TextInputAvoidingView>
			<Animated.View style={style.container}>
				<LinearGradient
					colors={['#00ab55']}
					style={[styles.centerAlign, { height: height / 6 }]}
				>
					{/* <Image
						source={require('../../../assets/nikiai-logo.png')}
						style={styles.logo}
					/> */}
				</LinearGradient>
				<View
					style={[
						styles.centerAlign,
						{
							marginTop: 0,
							backgroundColor: '#fffff7',
							height: height,
						},
					]}
				>
					<View style={styles.inputContainer}>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
						>
							SIGN UP
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
								<Text style={{ color: '#fff', fontSize: 18 }}>Sign up</Text>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</Animated.View>
		</TextInputAvoidingView>
	);
};

export default Signup;

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
