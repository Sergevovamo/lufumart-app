import React, { useState, useEffect, createRef } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Spinner, NativeBaseProvider } from 'native-base';
import LottieView from 'lottie-react-native';
import ActionSheet from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const { height } = Dimensions.get('screen');

import { checkOutOrder } from '../../../store/actions/order-actions';
import { clearErrors } from '../../../store/actions/error-actions';

import { auth } from '../../../store/actions/auth-actions';
import { showTabbar } from '../../../store/actions/app-settings-actions';
import { numberWithCommas } from '../../../utils/NumberWithCommas';

const actionSheetRef = createRef();

const sheet_height = height * 0.5;

const Checkout = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	let error = useSelector((state) => state.error);

	let currentUserAddress = useSelector(
		(state) => state.auth.currentUserAddress
	);
	// console.log(currentUserAddress);

	const orderSuccess = useSelector((state) => state.order?.orderSuccess);

	const cartProducts = useSelector(
		(state) => state.products?.cartDetails?.cartProducts
	);

	const cartProductTotal = useSelector(
		(state) => state.products?.cartDetails?.cartProductTotal
	);

	const [loop, setLoop] = useState(true);
	const [LottieAnim, setLottieAnim] = useState();
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		fetch('https://assets8.lottiefiles.com/packages/lf20_lk80fpsm.json', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				setLottieAnim(responseData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		let timer = setTimeout(() => setLoop(false), 3000);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	const checkOut = async () => {
		if (!currentUserAddress) {
			Toast.show({
				type: 'error',
				text1: 'Please choose delivery address',
				text2: `You must set delivery address to complete your order.`,
			});
		}
		if (currentUserAddress && cartProducts?.length > 0) {
			setButtonLoading(true);
			const data = {
				paymentMethod: 'Cash on Delivery',
				deliveryAddress: currentUserAddress,
			};
			await dispatch(checkOutOrder(data));
			dispatch(auth());
			setButtonLoading(false);
			actionSheetRef.current?.setModalVisible();
		} else {
			Toast.show({
				type: 'error',
				text1: 'Your cart is empty.',
				text2: `You do not have items in cart.`,
			});
		}
	};

	useEffect(() => {
		// Check for checkout error
		if (error.id === 'CHECKOUT_ORDER') {
			setButtonLoading(false);
			Toast.show({
				type: 'error',
				text1: 'Error! Something went wrong.',
				text2: `An error occurred while creating an order.`,
			});
			dispatch(clearErrors());
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	const continueShopping = () => {
		navigation.navigate('HomeScreen');
		dispatch(showTabbar());
	};

	return (
		<>
			<ActionSheet
				bounceOnOpen
				gestureEnabled
				indicatorColor="#f68b1e"
				overlayColor="#000000"
				closable={false}
				defaultOverlayOpacity={0.5}
				bounciness={10}
				ref={actionSheetRef}
			>
				<View style={{ height: sheet_height, padding: '5%' }}>
					<View
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: '5%',
						}}
					>
						{LottieAnim && (
							<LottieView
								source={LottieAnim}
								style={styles.loading}
								autoPlay
								loop={loop}
							/>
						)}

						<Text style={{ fontSize: 22, marginVertical: 10 }}>
							Congratulations!!!
						</Text>
						<Text style={{ fontSize: 18, marginBottom: 30 }}>
							Your order is successful.
						</Text>
						<TouchableOpacity
							onPress={continueShopping}
							style={{
								padding: 15,
								borderWidth: 2,
								borderColor: '#f68b1e',
								borderRadius: 10,
							}}
						>
							<Text style={{ color: '#f68b1e' }}>Continue shopping</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ActionSheet>
			<ScrollView style={{ backgroundColor: '#fffff7' }}>
				<View style={styles.container}>
					<View style={styles.deliveryContainer}>
						<Text style={{ fontSize: 18, paddingBottom: 5 }}>
							Delivery Address
						</Text>
						<View style={styles.deliveryWrapper}>
							<View style={styles.iconWrapper}>
								<Ionicons name="md-location-outline" size={24} color="#fff" />
							</View>
							<TouchableOpacity
								style={styles.locationWrapper}
								onPress={() => navigation.navigate('DeliveryAddressScreen')}
							>
								<View>
									<Text numberOfLines={2}>
										{currentUserAddress?.description
											? currentUserAddress?.description
											: 'Search your delivery location'}
									</Text>
								</View>
								<View>
									<AntDesign name="right" size={20} color="gray" />
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.paymentContainer}>
						<Text style={{ fontSize: 18, paddingBottom: 5 }}>
							Payment Method
						</Text>
						{/* <View style={styles.paymentWrapper}>
							<View style={styles.iconWrapper}>
								<AntDesign name="apple1" size={24} color="#fff" />
							</View>
							<TouchableOpacity style={styles.cardWrapper}>
								<View>
									<Text style={{ fontSize: 18 }}>Apple Pay</Text>
									<Text style={{ color: 'gray', fontSize: 12 }}>
										... ... 0675 8340
									</Text>
								</View>
								<View>
									<Feather name="circle" size={24} color="gray" />
								</View>
							</TouchableOpacity>
						</View> */}
						<View style={styles.paymentWrapper}>
							<View style={styles.iconWrapper}>
								<Ionicons name="cash-outline" size={24} color="#fff" />
							</View>
							<TouchableOpacity style={styles.cardWrapper}>
								<View>
									<Text style={{ fontSize: 18 }}>Cash on Delivery</Text>
								</View>
								<View>
									<FontAwesome5 name="dot-circle" size={24} color="black" />
								</View>
							</TouchableOpacity>
						</View>
						{/* <View style={styles.paymentWrapper}>
							<View style={styles.iconWrapper}>
								<Fontisto name="visa" size={17} color="#fff" />
							</View>
							<TouchableOpacity style={styles.cardWrapper}>
								<View>
									<Text style={{ fontSize: 18 }}>Visa</Text>
									<Text style={{ color: 'gray', fontSize: 12 }}>
										... ... 0585 7350
									</Text>
								</View>
								<View>
									<Feather name="circle" size={24} color="gray" />
								</View>
							</TouchableOpacity>
						</View> */}
					</View>
					<View style={styles.cartContainer}>
						<View style={styles.cartHeader}>
							<Text style={{ fontSize: 18, paddingBottom: 5 }}>My Cart</Text>
						</View>

						<FlatList
							data={cartProducts}
							keyExtractor={(item, index) => `${item}-${index}`}
							horizontal
							style={{ flexGrow: 0 }}
							contentContainerStyle={{ padding: 5 }}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item: product }) => {
								const { name, salePrice, imageUrl } = product;

								return (
									<View style={styles.product}>
										<View style={styles.imageContainer}>
											<Image
												source={{
													uri: `${imageUrl[0]}`,
												}}
												style={styles.image}
											/>
										</View>
										<View style={{ paddingHorizontal: 10 }}>
											<Text
												numberOfLines={2}
												style={{ paddingVertical: 5, fontSize: 12 }}
											>
												{name}
											</Text>
											<Text style={{ fontWeight: 'bold' }}>
												US ${numberWithCommas(salePrice.toFixed(2))}
											</Text>
										</View>
									</View>
								);
							}}
						/>
					</View>
					<View style={styles.productTotal}>
						<Text
							style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}
						>
							Total
						</Text>
						<Text
							style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}
						>
							USD ${numberWithCommas(parseFloat(cartProductTotal?.total))}
						</Text>
					</View>
					<TouchableOpacity onPress={checkOut} style={styles.button}>
						{buttonLoading ? (
							<NativeBaseProvider>
								<Spinner color="white" accessibilityLabel="Loading posts" />
							</NativeBaseProvider>
						) : (
							<Text style={{ color: '#fff', fontSize: 18 }}>Pay Now</Text>
						)}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		minHeight: height,
	},
	loading: {
		width: '30%',
	},
	deliveryContainer: {
		width: '100%',
		marginVertical: 15,
		paddingHorizontal: 18,
		minHeight: 100,
	},
	deliveryWrapper: {
		width: '100%',
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#fffff7',
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
	iconWrapper: {
		backgroundColor: '#f68b1e',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		padding: 10,
		width: 45,
	},
	locationWrapper: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
	},
	paymentContainer: {
		width: '100%',
		paddingHorizontal: 18,
		minHeight: 100,
	},
	paymentWrapper: {
		width: '100%',
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#fffff7',
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
	},
	product: {
		width: 150,
		height: 225,
		marginHorizontal: 8,
	},
	imageContainer: {
		backgroundColor: '#f3f7ff',
		marginVertical: 5,
		height: 150,
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
	cardWrapper: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
	},
	cartContainer: {
		width: '100%',
		// minHeight: 150,
		marginVertical: 15,
		paddingHorizontal: 18,
		// height: 150,
	},
	cartHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 20,
	},
	cartProduct: {
		padding: 1,
		marginTop: 10,
		flexDirection: 'row',
		marginRight: 5,
		width: 150,
		height: 100,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
		backgroundColor: '#fff',
	},
	productDetails: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		width: '50%',
	},
	productTotal: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 18,
		justifyContent: 'space-between',
		marginVertical: 5,
	},
	button: {
		width: '90%',
		height: 60,
		padding: 15,
		marginVertical: 15,
		backgroundColor: '#00ab55',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
});

const data = [
	{
		name: 'Baby Jeans',
		price: 2999,
		quantity: 5,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531593/shoes_k0zakp.jpg',
	},
	{
		name: 'Jacket',
		price: 1999,
		quantity: 2,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634534341/baby-hero_gzfipc.jpg',
	},
	{
		name: 'Bag',
		price: 4999,
		quantity: 7,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394323/samples/ecommerce/leather-bag-gray.jpg',
	},
	{
		name: 'Men Shoes',
		price: 3199,
		quantity: 3,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394319/samples/ecommerce/shoes.png',
	},
];
