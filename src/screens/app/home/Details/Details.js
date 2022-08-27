import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { numberWithCommas } from '../../../../utils/NumberWithCommas';

import {
	MaterialCommunityIcons,
	AntDesign,
	MaterialIcons,
	Fontisto,
} from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

import {
	addProductToCart,
	getCartProducts,
	decreaseCartProductQuantity,
} from '../../../../store/actions/product-actions';
import { calculateShippingFee } from '../../../../store/actions/order-actions';
import { currentUserAddress } from '../../../../store/actions/auth-actions';
import { mapStyle } from './MapStyle';

import ProductImage from './ProductImage';
// import RecentlyViewed from '../RecentlyViewed';

const SCREEN_WIDTH = Dimensions.get('window').width;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const ASPECT_RATIO = deviceWidth / deviceHeight;

const Details = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const route = useRoute();
	const mounted = useRef(false);

	const _map = useRef(null);
	const textInput = useRef(2);

	const [LottieAnim, setLottieAnim] = useState();
	const [translatedData, setTranslatedData] = useState([]);
	const [visible, setVisible] = useState(true);
	const [isOffline, setOfflineStatus] = useState(false);
	const [position, setPosition] = useState({
		latitude: -4.3758745,
		longitude: 15.3396506,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0922 * ASPECT_RATIO,
	});

	let currentUser = useSelector((state) => state.auth.isAuthenticated);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	let userAddress = useSelector((state) => state.auth.currentUserAddress);

	const product = useSelector((state) => state.products?.product);

	const cartProducts = useSelector(
		(state) => state.products?.cartDetails?.cartProducts
	);

	const cartProductQuantity = useSelector(
		(state) => state.products?.cartDetails?.cartProductQuantity
	);

	const shippingFee = useSelector((state) => state.order?.shippingFee);
	const isLoading = useSelector((state) => state.products?.isLoading);

	useEffect(() => {
		let isMounted = true;
		fetch('https://assets7.lottiefiles.com/packages/lf20_rwq6ciql.json', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (isMounted) {
					setLottieAnim(responseData);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		fetchShippingFee();
	}, []);

	const fetchShippingFee = useCallback(() => {
		dispatch(calculateShippingFee());
	}, [cartProducts]);

	// useEffect(async () => {
	// 	// set a clean up flag
	// 	mounted.current = true;

	// 	await checkPermission();

	// 	const getLocation = async () => {
	// 		mounted.current = true;
	// 		try {
	// 			const { granted } = await Location.requestForegroundPermissionsAsync();
	// 			if (!granted) return;
	// 			if (mounted.current) {
	// 				const {
	// 					coords: { latitude, longitude },
	// 				} = Location.watchPositionAsync(
	// 					{ accuracy: Location.Accuracy.High },
	// 					(loc) => {
	// 						const { latitude, longitude } = JSON.parse(
	// 							JSON.stringify(loc.coords)
	// 						);
	// 						// console.log(loc);

	// 						if (mounted.current) {
	// 							setPosition((prevState) => ({
	// 								...prevState,
	// 								latitude: latitude,
	// 								longitude: longitude,
	// 								latitudeDelta: 0.008,
	// 								longitudeDelta: 0.008,
	// 							}));
	// 						}
	// 					}
	// 				);
	// 			}
	// 		} catch (err) {}
	// 	};

	// 	getLocation();
	// }, []);

	const checkPermission = async () => {
		const hasPermission = await Location.requestForegroundPermissionsAsync();
		if (hasPermission.status === 'granted') {
			const permission = await askPermission();
			return permission;
		}
		return true;
	};

	const askPermission = async () => {
		const permission = await Location.requestForegroundPermissionsAsync();
		return permission.status === 'granted';
	};

	const goSearchedRegion = (searchedRegion) => {
		// complete this animation in 3 seconds

		_map.current.animateToRegion(searchedRegion, 3 * 1000);
	};

	return (
		<>
			<FlatList
				data={product}
				keyExtractor={(item, index) => `${item}-${index}`}
				style={{ flexGrow: 0 }}
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{ padding: 5 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: product }) => {
					const {
						_id,
						name,
						brand,
						size,
						weight,
						locality,
						quantity,
						salePrice,
						price,
						description,
						imageUrl,
						owner,
						translations,
					} = product;
					// console.log(name);

					let filteredCartItem = cartProducts?.filter((product) => {
						return product._id === _id;
					});
					// console.log(_id);

					let filteredCartItemQuantity = cartProductQuantity?.filter(
						(product) => {
							return product.productId === _id;
						}
					);

					return (
						<>
							<View style={{ flex: 1, backgroundColor: '#fffff7' }}>
								<ProductImage imageUrl={imageUrl} />
								<View style={styles.productDetails}>
									<TouchableOpacity style={styles.button}>
										<Text style={{ color: '#fff' }}>
											{locality && isEnglish ? 'Global' : 'Mondiale'}
										</Text>
									</TouchableOpacity>
									<Text style={{ marginTop: 5 }}>
										{isEnglish
											? translations[0]?.en[0]?.name
											: translations[0]?.fr[0]?.name}
									</Text>
									<Text style={{ marginTop: 5 }}>
										{isEnglish ? 'Brand' : 'Marque'} : {brand}
									</Text>
									<Text style={{ marginTop: 5 }}>
										{isEnglish ? 'Items In Stock' : 'Articles en stock'}:{' '}
										{quantity}
									</Text>
									<Text style={styles.price}>
										US ${numberWithCommas(salePrice.toFixed(2))}
									</Text>
									{/* <Text style={styles.initialPrice}>KSh {price}</Text> */}
									<Text style={styles.location}>
										{isEnglish ? '+ shipping fee of' : '+ frais de port de'} USD
										${shippingFee ? shippingFee : 0} {isEnglish ? 'from' : 'de'}{' '}
										{isEnglish ? 'Lufumart Seller to' : 'Vendeur Lufumart à'}{' '}
										{userAddress?.description
											? userAddress?.description
											: isEnglish
											? 'your location of choice'
											: 'votre emplacement de choix'}
									</Text>
									{filteredCartItem?.length > 0 ? (
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											{currentUser ? (
												<>
													<TouchableOpacity
														disabled={
															filteredCartItemQuantity[0]?.quantity === 1
																? true
																: false
														}
														onPress={() =>
															dispatch(decreaseCartProductQuantity(_id))
														}
														style={{
															width: '20%',
															height: 60,
															padding: 15,
															marginVertical: 15,
															backgroundColor:
																filteredCartItemQuantity[0]?.quantity === 1
																	? '#a0f2c9'
																	: '#00ab55',
															justifyContent: 'center',
															alignItems: 'center',
															borderRadius: 10,
														}}
													>
														<AntDesign
															name="minuscircle"
															size={22}
															color="#fff"
														/>
													</TouchableOpacity>
													<View
														style={{
															width: '60%',
															alignItems: 'center',
														}}
													>
														<Text style={{ fontSize: 20 }}>
															{filteredCartItemQuantity[0]?.quantity}
														</Text>
													</View>
													<TouchableOpacity
														onPress={() => dispatch(addProductToCart(_id))}
														style={style.iconButton}
													>
														<AntDesign
															name="pluscircle"
															size={22}
															color="#fff"
														/>
													</TouchableOpacity>
												</>
											) : (
												<TouchableOpacity
													style={style.button}
													onPress={() => navigation.navigate('AuthStackScreen')}
												>
													<View
														style={{
															width: '50%',
															flexDirection: 'row',
															justifyContent: 'space-around',
															alignItems: 'center',
														}}
													>
														<Text style={{ color: '#fff', fontSize: 18 }}>
															{isEnglish ? 'Sign in' : "S'identifier"}
														</Text>
													</View>
												</TouchableOpacity>
											)}
										</View>
									) : (
										<>
											{currentUser ? (
												<TouchableOpacity
													onPress={() => dispatch(addProductToCart(_id))}
													style={style.button}
												>
													<View
														style={{
															width: '50%',
															flexDirection: 'row',
															justifyContent: 'space-around',
															alignItems: 'center',
														}}
													>
														<MaterialIcons
															name="add-shopping-cart"
															size={24}
															color="#fff"
														/>
														<Text style={{ color: '#fff', fontSize: 18 }}>
															{' '}
															{isEnglish ? 'Add to Cart' : 'Ajouter au chariot'}
														</Text>
													</View>
												</TouchableOpacity>
											) : (
												<TouchableOpacity
													style={style.button}
													onPress={() => navigation.navigate('AuthStackScreen')}
												>
													<View
														style={{
															width: '50%',
															flexDirection: 'row',
															justifyContent: 'space-around',
															alignItems: 'center',
														}}
													>
														<Text style={{ color: '#fff', fontSize: 18 }}>
															{isEnglish ? 'Sign in' : "S'identifier"}
														</Text>
													</View>
												</TouchableOpacity>
											)}
										</>
									)}
								</View>
								<View>
									<Text style={styles.promotionTitle}>
										{isEnglish ? 'PROMOTIONS' : 'PROMOTIONS'}
									</Text>
									<View style={styles.promotionInnerContainer}>
										<View style={styles.promotionDetail}>
											<MaterialCommunityIcons
												name="truck-delivery-outline"
												size={24}
												color="black"
											/>
											<Text style={styles.promotionText}>
												{isEnglish
													? '14 day buyer protection'
													: "14 jours de protection de l'acheteur"}
											</Text>
										</View>
										<View style={[styles.promotionDetail, { marginTop: 5 }]}>
											<AntDesign name="Safety" size={24} color="black" />
											<Text style={styles.promotionText}>
												{isEnglish
													? 'Easy and safer payments via MaxiCash'
													: 'Paiements simples et sécurisés via MaxiCash'}
											</Text>
										</View>
									</View>
								</View>
								{/* <View>
							<Text style={styles.promotionTitle}>DELIVERY & RETURNS</Text>
						</View> */}
								<View>
									<Text style={styles.promotionTitle}>
										{isEnglish ? 'PRODUCT DETAILS' : 'DÉTAILS DU PRODUIT'}
									</Text>
									<View style={styles.itemInnerContainer}>
										<View>
											<View style={styles.itemHeader}>
												<Text style={styles.itemTitle}>
													{isEnglish ? 'Description' : 'La description'}
												</Text>
											</View>
											<Text>
												{isEnglish
													? translations[0]?.en[0]?.description
													: translations[0]?.fr[0]?.description}
											</Text>
											<Text style={{ marginTop: 30 }}>Size: {size}</Text>
											{/* <Text>Weight: {weight}</Text> */}
										</View>
									</View>
								</View>

								<GooglePlacesAutocomplete
									nearbyPlacesAPI="GooglePlacesSearch"
									placeholder={
										isEnglish
											? 'Search your delivery location'
											: 'Rechercher votre lieu de livraison'
									}
									listViewDisplayed={false}
									debounce={400}
									ref={textInput}
									minLength={2}
									enablePoweredByContainer={true}
									// returnKeyType={'default'}
									fetchDetails={true}
									autoFocus={true}
									textInputProps={{
										placeholderTextColor: 'gray',
										returnKeyType: 'search',
									}}
									styles={autoComplete}
									query={{
										key: GOOGLE_MAPS_APIKEY,
										language: 'en',
									}}
									onPress={(data, details = null) => {
										const searchedRegion = {
											latitude: details.geometry.location.lat,
											longitude: details.geometry.location.lng,
											latitudeDelta: 0.0043,
											longitudeDelta: 0.0034,
										};

										setPosition({
											latitude: details.geometry.location.lat,
											longitude: details.geometry.location.lng,
											address: data.description,
											coordinate: `${details.geometry.location.lat},${details.geometry.location.lng}`,
										});

										const address = {
											name: details.name,
											country: details.address_components,
											vicinity: details.vicinity,
											latitude: details.geometry.location.lat,
											longitude: details.geometry.location.lng,
											description: data.description,
										};
										// save user current address
										dispatch(currentUserAddress(address));
										goSearchedRegion(searchedRegion);
									}}
									onFail={(error) => console.error(error)}
								/>

								<View
									style={{
										marginTop: 10,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<MapView
										ref={_map}
										provider={PROVIDER_GOOGLE}
										style={styles.map}
										// customMapStyle={mapStyle}
										region={{
											latitude: position.latitude,
											longitude: position.longitude,
											latitudeDelta: 0.0922,
											longitudeDelta: 0.0922 * ASPECT_RATIO,
										}}
										showsUserLocation={true}
										followsUserLocation={true}
									>
										<Marker coordinate={position} />
									</MapView>
								</View>
								<View>
									<Text style={styles.promotionTitle}>
										{isEnglish
											? 'SELLER INFORMATION'
											: 'INFORMATION DU VENDEUR'}
									</Text>
								</View>
								<View style={styles.sellerContainer}>
									<View style={styles.popularText}>
										<Text style={{ fontSize: 8, color: '#fff' }}>
											{isEnglish ? 'POPULAR SELLER' : 'VENDEUR POPULAIRE'}
										</Text>
									</View>
									<View style={styles.sellerHeader}>
										<View style={styles.sellerInfo}>
											<Fontisto name="shopping-store" size={24} color="black" />
											<Text style={{ marginLeft: 5 }}>
												{isEnglish
													? 'Lufumart Online Store'
													: `Boutique en ligne Lufumart`}
											</Text>
										</View>
										{/* <TouchableOpacity style={styles.buttonSeller}>
											<Text style={{ color: '#fff' }}>Follow</Text>
										</TouchableOpacity> */}
									</View>
									<View
										style={{
											paddingVertical: 1,
											borderBottomColor: 'gray',
											borderBottomWidth: 1,
										}}
									/>
									<View style={styles.imageContainer}>
										{img?.map((image, index) => (
											<Image
												key={index}
												source={{
													uri: `${image}`,
												}}
												style={styles.image}
											/>
										))}
									</View>
									<View
										style={{
											paddingVertical: 1,
											borderBottomColor: 'gray',
											borderBottomWidth: 1,
										}}
									/>
									<View style={styles.sellerFooter}>
										<View style={styles.footerTitle}>
											<Text>
												{isEnglish
													? 'Check the latest arrivals'
													: `Vérifiez les derniers arrivages`}
											</Text>
											{/* <Text style={{ paddingVertical: 10 }}>74 followers</Text> */}
										</View>
										<TouchableOpacity
											style={{ flexDirection: 'row', alignItems: 'center' }}
										>
											{/* <MaterialIcons
												name="ios-share"
												size={20}
												color="#f68b1e"
											/> */}
											{/* <Text style={{ color: '#f68b1e' }}>SHARE</Text> */}
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<NoInternetModal
								show={isOffline}
								onRetry={fetchShippingFee}
								isRetrying={isLoading}
							/>
						</>
					);
				}}
			/>
		</>
	);
};

export default memo(Details);

const NoInternetModal = ({ show, onRetry, isRetrying }) => (
	<Modal isVisible={show} style={styles.modal} animationInTiming={600}>
		<View style={styles.modalContainer}>
			<Text style={styles.modalTitle}>Connection Error</Text>
			<Text style={styles.modalText}>
				Oops! Looks like your device is not connected to the Internet.
			</Text>
			<Button onPress={onRetry} disabled={isRetrying}>
				Try Again
			</Button>
		</View>
	</Modal>
);

const Button = ({ children, ...props }) => (
	<TouchableOpacity style={styles.buttonNet} {...props}>
		<Text style={styles.buttonTextNet}>{children}</Text>
	</TouchableOpacity>
);

const style = StyleSheet.create({
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
	iconButton: {
		width: '20%',
		height: 60,
		padding: 15,
		marginVertical: 15,
		backgroundColor: '#00ab55',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
});

const styles = StyleSheet.create({
	loading: {
		width: '15%',
	},
	productDetails: {
		width: '100%',
		minHeight: 250,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	button: {
		width: '30%',
		height: 25,
		backgroundColor: '#f68b1e',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
	price: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	initialPrice: {
		marginTop: 5,
		fontSize: 18,
		color: 'gray',
		textDecorationLine: 'line-through',
	},
	location: {
		marginTop: 5,
	},
	map: {
		height: Platform.OS === 'ios' ? 450 : 350,
		marginVertical: 0,
		width: SCREEN_WIDTH * 0.92,
	},
	promotionTitle: {
		marginVertical: 20,
		marginHorizontal: 15,
		color: 'gray',
	},
	promotionInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	promotionDetail: {
		flexDirection: 'row',
	},
	promotionText: {
		marginHorizontal: 10,
	},
	itemInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	itemHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	sellerInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	// Seller Card Styles
	sellerContainer: {
		marginVertical: 1,
		padding: 3,
		width: Platform.OS === 'ios' ? SCREEN_WIDTH * 0.9 : SCREEN_WIDTH * 0.9,
		height: 250,
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
		marginHorizontal: 8,
		backgroundColor: '#fff',
	},
	popularText: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 25,
		borderRadius: 7,
		width: '35%',
		top: 5,
		left: 1,
		zIndex: 10,
		backgroundColor: '#f68b1e',
	},
	sellerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	sellerInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonSeller: {
		width: '30%',
		height: 30,
		backgroundColor: '#00ab55',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
	imageContainer: {
		marginVertical: 5,
		height: 100,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		marginLeft: 5,
		width: '30%',
		height: '100%',
	},
	sellerFooter: {
		flexDirection: 'row',
		height: 60,
		justifyContent: 'space-between',
		paddingVertical: 5,
		paddingHorizontal: 5,
		alignItems: 'center',
	},
	footerTitle: {
		flexDirection: 'column',
	},

	// Network Connection modal
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	modalContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 40,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: '600',
	},
	modalText: {
		fontSize: 18,
		color: '#555',
		marginTop: 14,
		textAlign: 'center',
		marginBottom: 10,
	},
	buttonNet: {
		backgroundColor: '#000',
		paddingVertical: 12,
		paddingHorizontal: 16,
		width: '100%',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonTextNet: {
		color: '#fff',
		fontSize: 20,
	},
});

let img = [
	'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902158/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg_vnw53j.jpg',
	'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902075/samples/ecommerce/socks-1631103779.jpg_myt5ec.jpg',
	'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900217/samples/ecommerce/00000000_zi_8be594af-52ce-4fe5-9d04-6bb31a8cb06a_lbwzrk.jpg',
];

const autoComplete = {
	textInput: {
		backgroundColor: '#f3f7ff',
		height: 50,
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		fontSize: 15,
		flex: 1,
		// borderWidth: 1,
		marginHorizontal: 15,
	},
	container: {
		paddingTop: 20,
		flex: 1,
		// backgroundColor: '#fff',
	},

	textInputContainer: {
		flexDirection: 'row',
	},
};
