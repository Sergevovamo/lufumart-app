import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
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
	Checkbox,
	Center,
	Spinner,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	NativeBaseProvider,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../store/actions/auth-actions';
import { clearErrors } from '../../store/actions/error-actions';
import { getValueFor } from '../../utils/secureStore';

import TextInputAvoidingView from '../../components/KeyboardAvoidingWrapper';

const Signup = ({ navigation }) => {
	const dispatch = useDispatch();
	let error = useSelector((state) => state.error);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isSelected, setSelection] = useState(false);

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
		await dispatch(registerUser(data, isSelected));

		confirmToken();
	};

	// Register successful
	const confirmToken = async () => {
		const token = await getValueFor('userToken');
		if (token) {
			// Go to home screen
			navigation.navigate('HomeScreen');
		}
	};

	useEffect(() => {
		// Check for register error
		if (error.id === 'REGISTER_FAIL') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				autoHide: false,
				text1: 'An account with given email already exists!',
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
			style={{ flexGrow: 0 }}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{ padding: 5 }}
			showsVerticalScrollIndicator={false}
			renderItem={({ item: data }) => (
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
										{isEnglish
											? `We're glad to have you`
											: `Nous sommes heureux de vous avoir`}
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
											? 'Sign up to continue!'
											: `Inscrivez-vous pour continuer !`}
									</Heading>

									<VStack space={3} mt="5">
										<FormControl
											isInvalid={errors?.name?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish ? 'Your name' : `Votre nom`}
											</FormControl.Label>
											<Controller
												control={control}
												name="name"
												render={({ field: { onChange, value } }) => (
													<Input
														size="lg"
														placeholder={isEnglish ? 'John Doe' : 'John Doe'}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													required: {
														value: true,
														message: isEnglish
															? 'Name is required'
															: `Le nom est requis`,
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
													: `Votre adresse e-mail`}
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
																? 'johndoe@example.com'
																: `johndoe@example.com`
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
											isInvalid={errors?.phone?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish
													? 'Your mobile number'
													: `Ton numéro de téléphone`}
											</FormControl.Label>
											<Controller
												control={control}
												name="phone"
												render={({ field: { onChange, value } }) => (
													<Input
														keyboardType="numeric"
														size="lg"
														placeholder={
															isEnglish ? '0800695000' : `0800695000`
														}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													required: {
														value: true,
														message: isEnglish
															? 'Phone number is required'
															: `Le numéro de téléphone est requis`,
													},
													pattern: {
														value: /^(\+254|0)[1-9]\d{8}$/i,
														message: isEnglish
															? 'Please enter a valid mobile number'
															: `Veuillez entrer un numéro de portable valide`,
													},
												}}
											/>

											<FormControl.ErrorMessage
												leftIcon={<WarningOutlineIcon size="xs" />}
											>
												{errors?.phone?.message}
											</FormControl.ErrorMessage>
										</FormControl>

										<FormControl
											isInvalid={errors?.gender?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish
													? 'Choose your gender'
													: `Choisissez votre genre`}
											</FormControl.Label>

											<Controller
												control={control}
												name="gender"
												render={({ field: { onChange, value, onBlur } }) => (
													<Select
														value={value}
														onValueChange={(value) => onChange(value)}
														accessibilityLabel={
															isEnglish
																? 'Choose your Gender'
																: `Choisissez votre genre`
														}
														placeholder={
															isEnglish ? 'Choose gender' : `Choisissez le sexe`
														}
														_selectedItem={{
															bg: 'teal.600',
															endIcon: <CheckIcon size={5} />,
														}}
														mt="1"
													>
														<Select.Item
															label={isEnglish ? 'Male' : `Mâle`}
															value="Male"
														/>
														<Select.Item
															label={isEnglish ? 'Female' : `Femelle`}
															value="Female"
														/>
													</Select>
												)}
												rules={{
													required: {
														value: true,
														message: isEnglish
															? 'Please make a selection!'
															: `Veuillez faire une sélection!`,
													},
												}}
											/>
											<FormControl.ErrorMessage
												leftIcon={<WarningOutlineIcon size="xs" />}
											>
												{errors?.gender?.message}
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl>
											<FormControl.Label>
												{isEnglish ? 'Referral Code' : `Code de Parrainage`}
											</FormControl.Label>
											<Controller
												control={control}
												name="referralCode"
												render={({ field: { onChange, value } }) => (
													<Input
														size="lg"
														placeholder={'6331e5280b6bf12da4e6753e'}
														value={value}
														onChangeText={(value) => onChange(value)}
													/>
												)}
												rules={{
													pattern: {
														value: /^[a-f\d]{24}$/i,
														message: isEnglish
															? 'Please enter a valid referral code'
															: `Veuillez entrer un code de parrainage valide`,
													},
												}}
											/>

											<FormControl.ErrorMessage
												leftIcon={<WarningOutlineIcon size="xs" />}
											>
												{errors?.referralCode?.message}
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl
											isInvalid={errors?.password?.message ? true : false}
											isRequired
										>
											<FormControl.Label>
												{isEnglish ? 'Password' : `Mot de passe`}
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
																: `Entrer le mot de passe`
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
											{/* <HStack space={6} style={{ marginVertical: 15 }}>
												<Checkbox
													shadow={2}
													value="test"
													onChange={() => setSelection(!isSelected)}
													colorScheme="orange"
												>
													Become a seller at Lufumart
												</Checkbox>
											</HStack> */}

											<Link
												href="https://docs.google.com/document/d/1zyycAX15prrhTrIR5H-g3nUVEOUgTvvyQzZwIoHQSSg/edit?usp=sharing"
												_text={{
													fontSize: 'xs',
													fontWeight: '500',
													color: 'orange.500',
												}}
												alignSelf="flex-end"
												mt="1"
											>
												{isEnglish
													? 'Privacy Policy'
													: `Politique de confidentialité`}
											</Link>
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
													{isEnglish ? 'Sign up' : `S'inscrire`}
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
													? 'Already have an account?'
													: `Vous avez déjà un compte?`}{' '}
											</Text>
											<TouchableOpacity
												onPress={() => navigation.navigate('AuthScreen')}
											>
												<Text
													style={{
														color: '#f68b1e',
														fontWeight: '500',
														textDecorationLine: 'underline',
													}}
												>
													{isEnglish ? 'Sign in' : `S'identifier`}
												</Text>
											</TouchableOpacity>
										</HStack>
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

export default Signup;

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	checkbox: {
		alignSelf: 'center',
	},
	label: {
		margin: 8,
	},
});

const data = [
	{
		name: 'Dummy Data Signup',
	},
];
