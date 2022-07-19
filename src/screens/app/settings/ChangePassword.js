import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useForm, Controller } from 'react-hook-form';
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
import { clearErrors } from '../../../store/actions/error-actions';

import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';

const ChangePassword = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	let error = useSelector((state) => state.error);

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
								Password reset
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
								Please provide your current password for password update.
							</Heading>

							<VStack space={3} mt="5">
								<FormControl
									isInvalid={errors?.password?.message ? true : false}
									isRequired
								>
									<FormControl.Label>Current Password</FormControl.Label>
									<Controller
										control={control}
										name="password"
										render={({ field: { onChange, value } }) => (
											<Input
												type={showPassword ? 'text' : 'password'}
												size="lg"
												placeholder="Enter password"
												value={value}
												onChangeText={(value) => onChange(value)}
												InputRightElement={
													<Button
														size="xs"
														rounded="none"
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
												message: 'Current password is required',
											},
											minLength: {
												value: 8,
												message: 'Password should be atleast 8 characters',
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
									<FormControl.Label>New Password</FormControl.Label>
									<Controller
										control={control}
										name="new_password"
										render={({ field: { onChange, value } }) => (
											<Input
												type={showNewPassword ? 'text' : 'password'}
												size="lg"
												placeholder="Enter new password"
												value={value}
												onChangeText={(value) => onChange(value)}
												InputRightElement={
													<Button
														size="xs"
														rounded="none"
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
												message: 'New password is required',
											},
											minLength: {
												value: 8,
												message: 'Password should be atleast 8 characters',
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
											Update password
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
