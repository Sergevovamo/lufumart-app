import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { changePassword } from '../../../store/actions/auth-actions';
import { hideTabbar } from '../../../store/actions/app-settings-actions';
import { clearErrors } from '../../../store/actions/error-actions';

import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';

const ChangePassword = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const route = useRoute();
	const mounted = useRef(false);

	let error = useSelector((state) => state.error);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleNewPassword = () => {
		setShowNewPassword(!showNewPassword);
	};

	const onSubmit = async (data) => {
		// Attempt to authenticate user
		const { password, new_password } = data;
		const newData = {
			current_password: password,
			new_password,
		};

		setButtonLoading(true);
		await dispatch(changePassword(newData));
	};

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'SettingsChangePasswordScreen') {
			if (mounted.current) {
				dispatch(hideTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	useEffect(() => {
		// Check for register error
		if (error.id === 'CHANGE_PASSWORD') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				text1: 'Invalid credentials. Please try again!',
				text2: 'Either your current password is incorrect.',
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<NativeBaseProvider>
			<TextInputAvoidingView>
				<Center
					px="3"
					style={{
						backgroundColor: '#fff',
						borderRadius: 20,
						paddingHorizontal: 20,
					}}
				>
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
								{isEnglish
									? 'Password reset'
									: 'Réinitialisation du mot de passe'}
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
									? 'Please provide your current password for password update.'
									: 'Veuillez fournir votre mot de passe actuel pour la mise à jour du mot de passe.'}
							</Heading>

							<VStack space={3} mt="5">
								<FormControl
									isInvalid={errors?.password?.message ? true : false}
									isRequired
								>
									<FormControl.Label>
										{isEnglish ? 'Current Password' : 'Mot de passe actuel'}
									</FormControl.Label>
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
														: 'Entrer le mot de passe'
												}
												value={value}
												onChangeText={(value) => onChange(value)}
												InputRightElement={
													<Button
														size="xs"
														rounded="none"
														colorScheme="orange"
														h="full"
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
												message: `${
													isEnglish
														? 'Current password is required'
														: 'Le mot de passe actuel est requis'
												}`,
											},
											minLength: {
												value: 8,
												message: `${
													isEnglish
														? 'Password should be atleast 8 characters'
														: 'Le mot de passe doit comporter au moins 8 caractères'
												}`,
											},
										}}
									/>

									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										{errors?.password?.message}
									</FormControl.ErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={errors?.password?.message ? true : false}
									isRequired
								>
									<FormControl.Label>
										{isEnglish ? 'New Password' : 'Nouveau mot de passe'}
									</FormControl.Label>
									<Controller
										control={control}
										name="new_password"
										render={({ field: { onChange, value } }) => (
											<Input
												type={showNewPassword ? 'text' : 'password'}
												size="lg"
												placeholder={
													isEnglish
														? 'Enter new password'
														: 'Entrez un nouveau mot de passe'
												}
												value={value}
												onChangeText={(value) => onChange(value)}
												InputRightElement={
													<Button
														size="xs"
														rounded="none"
														colorScheme="orange"
														h="full"
														onPress={toggleNewPassword}
													>
														{showNewPassword ? 'Hide' : 'Show'}
													</Button>
												}
											/>
										)}
										rules={{
											required: {
												value: true,
												message: `${
													isEnglish
														? 'New password is required'
														: 'Un nouveau mot de passe est requis'
												}`,
											},
											minLength: {
												value: 8,
												message: `${
													isEnglish
														? 'Password should be atleast 8 characters'
														: 'Le mot de passe doit comporter au moins 8 caractères'
												}`,
											},
										}}
									/>

									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										{errors?.new_password?.message}
									</FormControl.ErrorMessage>
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
											{isEnglish
												? 'Update password'
												: 'Mettre à jour le mot de passe'}
										</Text>
									)}
								</Button>
							</VStack>
						</Box>
					</Center>
				</Center>
			</TextInputAvoidingView>
		</NativeBaseProvider>
	);
};

export default ChangePassword;
