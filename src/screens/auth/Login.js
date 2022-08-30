import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from 'react-hook-form';
import * as Localization from 'expo-localization';
import {
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	HStack,
	Center,
	Spinner,
	WarningOutlineIcon,
	NativeBaseProvider,
} from 'native-base';
import { loginUser } from '../../store/actions/auth-actions';
import { clearErrors } from '../../store/actions/error-actions';
import { getValueFor } from '../../utils/secureStore';

import TextInputAvoidingView from '../../components/KeyboardAvoidingWrapper';

const Login = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	let error = useSelector((state) => state.error);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

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
		confirmToken();
	};

	// Login successful
	const confirmToken = async () => {
		const token = await getValueFor('userToken');
		if (token) {
			// Hide login screen
			navigation.goBack();
		}
	};

	useEffect(() => {
		// Check for register error
		if (error.id === 'LOGIN_FAIL') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				autoHide: false,
				text1: 'Invalid credentials. Please try again!',
				text2: 'Either your email address or password is incorrect.',
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<NativeBaseProvider>
			<TextInputAvoidingView>
				<Center px="3">
					<Center w="100%">
						<Box safeArea p="2" py="8" w="90%" maxW="290">
							<Heading
								size="lg"
								fontWeight="600"
								color="coolGray.800"
								_dark={{
									color: 'warmGray.50',
								}}
							>
								{isEnglish ? 'Welcome' : `Bienvenue`}
							</Heading>
							<Heading
								mt="1"
								_dark={{
									color: 'warmGray.200',
								}}
								color="coolGray.600"
								fontWeight="medium"
								size="xs"
							>
								{isEnglish
									? 'Sign in to continue!'
									: `Connectez-vous pour continuer !`}
							</Heading>

							<VStack space={3} mt="5">
								<FormControl
									isInvalid={errors?.email?.message ? true : false}
									isRequired
								>
									<FormControl.Label>
										{isEnglish ? 'Your email address' : `Votre adresse e-mail`}
									</FormControl.Label>
									<Controller
										control={control}
										type="email"
										name="email"
										render={({ field: { onChange, value } }) => (
											<Input
												keyboardType="email-address"
												size="lg"
												placeholder={
													isEnglish
														? 'Enter email address'
														: `Entrer l'adresse e-mail`
												}
												value={value}
												onChangeText={(value) => onChange(value)}
											/>
										)}
										rules={{
											required: {
												value: true,
												message: isEnglish
													? 'Email address is required'
													: `Adresse e-mail est nécessaire`,
											},
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: isEnglish
													? 'Invalid email address'
													: `Adresse e-mail invalide`,
											},
										}}
									/>

									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										{errors?.email?.message}
									</FormControl.ErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={errors?.password?.message ? true : false}
									isRequired
								>
									<FormControl.Label>Password</FormControl.Label>
									<Controller
										control={control}
										name="password"
										render={({ field: { onChange, value } }) => (
											<Input
												type={showPassword ? 'text' : 'password'}
												size="lg"
												placeholder={
													isEnglish
														? 'Enter password'
														: `Entrer le mot de passe`
												}
												value={value}
												onChangeText={(value) => onChange(value)}
												InputRightElement={
													<Button
														size="xs"
														rounded="none"
														h="full"
														colorScheme="orange"
														onPress={togglePassword}
													>
														{showPassword ? 'Hide' : 'Show'}
													</Button>
												}
											/>
										)}
										rules={{
											required: {
												value: true,
												message: isEnglish
													? 'Password is required'
													: `Mot de passe requis`,
											},
											minLength: {
												value: 8,
												message: isEnglish
													? 'Password should be atleast 8 characters'
													: `Le mot de passe doit comporter au moins 8 caractères`,
											},
										}}
									/>

									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										{errors?.password?.message}
									</FormControl.ErrorMessage>

									<TouchableOpacity
										style={{ alignSelf: 'flex-end' }}
										onPress={() =>
											navigation.navigate('AuthScreenForgotPassword')
										}
									>
										<Text
											style={{
												color: '#f68b1e',
												fontSize: 12,
												marginTop: 5,
												fontWeight: '500',
												textDecorationLine: 'underline',
											}}
										>
											{isEnglish ? 'Forgot Password?' : `Mot de passe oublié?`}
										</Text>
									</TouchableOpacity>
								</FormControl>
								<Button
									mt="2"
									colorScheme="green"
									onPress={handleSubmit(onSubmit)}
								>
									{buttonLoading ? (
										<>
											<Spinner
												color="white"
												accessibilityLabel="Loading posts"
											/>
										</>
									) : (
										<Text style={{ color: '#fff', fontSize: 18 }}>
											{isEnglish ? 'Sign in' : `S'identifier`}
										</Text>
									)}
								</Button>
								<HStack mt="6" justifyContent="center">
									<Text
										fontSize="sm"
										color="coolGray.600"
										_dark={{
											color: 'warmGray.200',
										}}
									>
										{isEnglish
											? `Don't have an account?`
											: `Vous n'avez pas de compte ?`}{' '}
									</Text>
									<TouchableOpacity
										onPress={() => navigation.navigate('AuthScreenSignup')}
									>
										<Text
											style={{
												color: '#f68b1e',
												fontWeight: '500',
												textDecorationLine: 'underline',
											}}
										>
											{isEnglish ? 'Sign Up' : `S'inscrire`}
										</Text>
									</TouchableOpacity>
								</HStack>
							</VStack>
						</Box>
					</Center>
				</Center>
			</TextInputAvoidingView>
		</NativeBaseProvider>
	);
};

export default Login;
