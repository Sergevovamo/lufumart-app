import { TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Localization from 'expo-localization';
import {
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Link,
	Input,
	Button,
	HStack,
	Center,
	Spinner,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	NativeBaseProvider,
} from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { updateUserInfo } from '../../../store/actions/auth-actions';
import { clearErrors } from '../../../store/actions/error-actions';

import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';

const Profile = ({ navigation }) => {
	const dispatch = useDispatch();
	const route = useRoute();
	const mounted = useRef(false);

	let error = useSelector((state) => state.error);
	let currentUser = useSelector((state) => state.auth.user?.current_user);
	// console.log(currentUser);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (data) => {
		// Attempt to update userInfo

		setButtonLoading(true);
		await dispatch(updateUserInfo(data));
	};

	useEffect(() => {
		reset({
			name: currentUser?.name,
			email: currentUser?.email,
			phone: `0${currentUser?.phone.toString()}`,
		});
	}, []);

	useEffect(() => {
		// Check for register error
		if (error.id === 'UPDATE_USER') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				text1: 'An error occured during account update',
				text2: 'Oops, something went wrong',
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => `${item}-${index}`}
			style={{ flexGrow: 1 }}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{ padding: 5 }}
			showsVerticalScrollIndicator={false}
			renderItem={({ item: data }) => (
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
										{isEnglish ? 'Your Details' : 'Vos détails'}
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
											? `You can edit your personal details here. When you're done, tap "Save"`
											: `Vous pouvez modifier vos données personnelles ici. Lorsque vous avez terminé, appuyez sur "Enregistrer"`}
									</Heading>

									<VStack space={3} mt="5">
										<FormControl
											isInvalid={errors?.name?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish ? 'Your name' : 'Votre nom'}
											</FormControl.Label>
											<Controller
												control={control}
												name="name"
												render={({ field: { onChange, value } }) => (
													<Input
														size="lg"
														placeholder={
															isEnglish ? 'Enter name' : 'Entrez le nom'
														}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													required: {
														value: true,
														message: `${
															isEnglish
																? 'Name is required'
																: 'Le nom est requis'
														}`,
													},
												}}
											/>

											<FormControl.ErrorMessage
												leftIcon={<WarningOutlineIcon size="xs" />}
											>
												{errors?.name?.message}
											</FormControl.ErrorMessage>
										</FormControl>

										<FormControl
											isInvalid={errors?.email?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish
													? 'Your email address'
													: 'Votre adresse e-mail'}
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
																: "Entrer l'adresse e-mail"
														}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													required: {
														value: true,
														message: `${
															isEnglish
																? 'Email address is required'
																: 'Adresse e-mail est nécessaire'
														}`,
													},
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: `${
															isEnglish
																? 'Invalid email address'
																: 'Adresse e-mail invalide'
														}`,
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
											isInvalid={errors?.phone?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish
													? 'Your mobile number'
													: 'Ton numéro de téléphone'}
											</FormControl.Label>
											<Controller
												control={control}
												name="phone"
												render={({ field: { onChange, value } }) => (
													<Input
														keyboardType="numeric"
														size="lg"
														placeholder={
															isEnglish
																? 'Enter mobile number'
																: 'Entrez le numéro de téléphone portable'
														}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													required: {
														value: true,
														message: `${
															isEnglish
																? 'Phone number is required'
																: 'Le numéro de téléphone est requis'
														}`,
													},
													pattern: {
														value: /^(\+254|0)[1-9]\d{8}$/i,
														message: `${
															isEnglish
																? 'Please enter a valid mobile number'
																: 'Veuillez entrer un numéro de portable valide'
														}`,
													},
												}}
											/>

											<FormControl.ErrorMessage
												leftIcon={<WarningOutlineIcon size="xs" />}
											>
												{errors?.phone?.message}
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
													{isEnglish ? 'Save' : 'Sauvegarder'}
												</Text>
											)}
										</Button>
									</VStack>
								</Box>
							</Center>
						</Center>
					</TextInputAvoidingView>
				</NativeBaseProvider>
			)}
		/>
	);
};

export default Profile;

const data = [
	{
		name: 'Dummy Data Signup',
	},
];
