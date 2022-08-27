import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Link,
	Input,
	Button,
	TextArea,
	HStack,
	Center,
	Spinner,
	Radio,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	NativeBaseProvider,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Localization from 'expo-localization';
import { useForm, Controller } from 'react-hook-form';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';

const VirtualizedView = (props) => {
	return (
		<FlatList
			data={[]}
			ListEmptyComponent={null}
			keyExtractor={() => 'dummy'}
			renderItem={null}
			ListHeaderComponent={() => (
				<React.Fragment>{props.children}</React.Fragment>
			)}
		/>
	);
};

const AddProducts = () => {
	const navigation = useNavigation();
	const route = useRoute();
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [images, setImages] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: true,
			selectionLimit: 5,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImages(result.selected?.map((image) => image.uri));
		}
	};

	const onDelete = (image) => {
		const currentIndex = images.indexOf(image);

		let newImages = [...images];
		newImages.splice(currentIndex, 1);

		setImages(newImages);
	};

	const onSubmit = async (data) => {
		// Attempt to create product
		console.log(data);

		// setButtonLoading(true);
		// await dispatch(updateUserInfo(data));
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#f3f7ff',
			}}
		>
			<VirtualizedView>
				<View
					style={{ backgroundColor: 'white', padding: 15, fontWeight: 'bold' }}
				>
					<Text>Upload Images</Text>
				</View>
				<TouchableOpacity
					onPress={pickImage}
					style={{ alignItems: 'center', padding: 20 }}
				>
					<MaterialCommunityIcons
						name="camera-plus-outline"
						size={70}
						color="#00ab55"
					/>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingTop: 15,
						}}
					>
						<AntDesign name="plus" size={20} color="#00ab55" />
						<Text style={{ color: '#00ab55', paddingHorizontal: 10 }}>
							Add a maximum of 5 images
						</Text>
					</View>
				</TouchableOpacity>

				<FlatList
					data={images}
					keyExtractor={(item, index) => `${item}-${index}`}
					horizontal
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ padding: 5 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item: image }) => {
						return (
							<TouchableOpacity onPress={() => onDelete(image)}>
								<View style={styles.product}>
									<View style={styles.imageContainer}>
										<Image
											source={{
												uri: image,
											}}
											style={styles.image}
										/>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
				<View
					style={{ backgroundColor: 'white', padding: 15, fontWeight: 'bold' }}
				>
					<Text>Product Information</Text>
				</View>
				<NativeBaseProvider>
					<TextInputAvoidingView>
						<Center
							px="4"
							style={{
								backgroundColor: '#fff',
								paddingHorizontal: 20,
							}}
						>
							<FormControl
								isInvalid={errors?.name?.message ? true : false}
								isRequired
							>
								<FormControl.Label mb="3">
									{isEnglish ? 'Item Title' : `Titre de l'article`}
								</FormControl.Label>
								<Controller
									control={control}
									name="name"
									render={({ field: { onChange, value } }) => (
										<Input
											size="lg"
											mb="4"
											placeholder={
												isEnglish ? 'Enter title' : 'Entrez le titre'
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
													? 'Item title is required'
													: `Le titre de l'article est requis`
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
								isInvalid={errors?.description?.message ? true : false}
								isRequired
							>
								<FormControl.Label>
									{isEnglish ? 'Description' : `La description`}
								</FormControl.Label>
								<Controller
									control={control}
									name="description"
									render={({ field: { onChange, value } }) => (
										<Box alignItems="center" w="100%">
											<TextArea
												h={20}
												mb="4"
												placeholder={
													isEnglish
														? 'Provide product description'
														: `Fournir la description du produit`
												}
												value={value}
												onChangeText={(value) => onChange(value)}
											/>
										</Box>
									)}
									rules={{
										required: {
											value: true,
											message: `${
												isEnglish
													? 'Product description is required'
													: `La description du produit est requise`
											}`,
										},
									}}
								/>
								<FormControl.ErrorMessage
									leftIcon={<WarningOutlineIcon size="xs" />}
								>
									{errors?.description?.message}
								</FormControl.ErrorMessage>
							</FormControl>

							<FormControl>
								<FormControl.Label mb="3">
									{isEnglish
										? 'What is your Product condition?'
										: `Quel est l'état de votre produit ?`}
								</FormControl.Label>
								<Radio.Group nativeID="patani" name="day_night">
									<VStack space="3">
										<Radio value="brand new">Brand New</Radio>
										<Text
											style={{
												color: 'gray',
												fontSize: 12,
												paddingLeft: 33,
											}}
										>
											{isEnglish
												? 'Product is sealed and/or has not been used.'
												: `Le produit est scellé et/ou n'a pas été utilisé.`}
										</Text>
										<Radio value="used">Used</Radio>
										<Text
											style={{
												color: 'gray',
												fontSize: 12,
												paddingLeft: 33,
											}}
										>
											{isEnglish
												? 'Reselling product that has previously been used.'
												: `Revendre un produit qui a déjà été utilisé.`}
										</Text>
										<Radio value="custom made">Custom Made</Radio>
										<Text
											style={{
												color: 'gray',
												fontSize: 12,
												paddingLeft: 33,
											}}
										>
											{isEnglish
												? 'Product you are designing and/or produced upon order.'
												: `Produit que vous concevez et/ou produit sur commande.`}
										</Text>
										<Radio value="refurbished">Refurbished</Radio>
										<Text
											style={{
												color: 'gray',
												fontSize: 12,
												paddingLeft: 33,
											}}
										>
											{isEnglish
												? 'Used product that has been renewed or updated for retail.'
												: `Produit d'occasion qui a été renouvelé ou mis à jour pour la vente au détail.`}
										</Text>
									</VStack>
								</Radio.Group>
							</FormControl>

							<FormControl
								isInvalid={errors?.quantity?.message ? true : false}
								isRequired
							>
								<FormControl.Label mt="4" mb="3">
									{isEnglish ? 'Quantity in Stock' : 'la quantité en dépôt'}
								</FormControl.Label>
								<Controller
									control={control}
									name="quantity"
									render={({ field: { onChange, value } }) => (
										<Input
											keyboardType="numeric"
											size="lg"
											placeholder={
												isEnglish
													? 'Enter quantity in stock'
													: 'Entrer la quantité en stock'
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
													? 'Quantity in Stock is required'
													: 'La quantité en stock est requise'
											}`,
										},
									}}
								/>

								<FormControl.ErrorMessage
									leftIcon={<WarningOutlineIcon size="xs" />}
								>
									{errors?.quantity?.message}
								</FormControl.ErrorMessage>
							</FormControl>

							<FormControl>
								<FormControl.Label mt="4">
									{isEnglish ? 'Brand Name' : `Marque`}
								</FormControl.Label>
								<Controller
									control={control}
									name="brand"
									render={({ field: { onChange, value } }) => (
										<Input
											size="lg"
											mb="4"
											placeholder={
												isEnglish
													? 'Enter brand name'
													: 'Entrez le nom de la marque'
											}
											value={value}
											onChangeText={(value) => onChange(value)}
										/>
									)}
								/>
							</FormControl>

							<FormControl>
								<FormControl.Label mt="4">
									{isEnglish ? 'Model' : `Modèle`}
								</FormControl.Label>
								<Controller
									control={control}
									name="model"
									render={({ field: { onChange, value } }) => (
										<Input
											size="lg"
											mb="4"
											placeholder={
												isEnglish ? 'Enter model' : 'Entrez le modèle'
											}
											value={value}
											onChangeText={(value) => onChange(value)}
										/>
									)}
								/>
							</FormControl>

							<FormControl>
								<FormControl.Label mt="4">
									{isEnglish ? 'Color' : `Couleur`}
								</FormControl.Label>
								<Controller
									control={control}
									name="color"
									render={({ field: { onChange, value } }) => (
										<Input
											size="lg"
											mb="4"
											placeholder={
												isEnglish ? 'Enter color' : 'Entrez la couleur'
											}
											value={value}
											onChangeText={(value) => onChange(value)}
										/>
									)}
								/>
							</FormControl>

							<Button
								mt="2"
								colorScheme="green"
								onPress={handleSubmit(onSubmit)}
							>
								{buttonLoading ? (
									<>
										<Spinner color="white" accessibilityLabel="Loading posts" />
									</>
								) : (
									<Text style={{ color: '#fff', fontSize: 18 }}>
										{isEnglish ? 'Save' : 'Sauvegarder'}
									</Text>
								)}
							</Button>
						</Center>
					</TextInputAvoidingView>
				</NativeBaseProvider>
			</VirtualizedView>
		</View>
	);
};

export default AddProducts;

const styles = StyleSheet.create({
	product: {
		width: 150,
		height: 105,
		marginHorizontal: 8,
	},
	imageContainer: {
		backgroundColor: '#fff',
		marginVertical: 5,
		height: 100,
		width: '100%',
		borderRadius: 7,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		width: '85%',
		height: '100%',
	},
});
