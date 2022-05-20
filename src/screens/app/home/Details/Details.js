import React, { useState, useEffect, Fragment } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import { numberWithCommas } from '../../../../utils/NumberWithCommas';

import {
	MaterialCommunityIcons,
	AntDesign,
	MaterialIcons,
} from '@expo/vector-icons';

import {
	addProductToCart,
	getCartProducts,
	decreaseCartProductQuantity,
} from '../../../../store/actions/product-actions';

import ProductImage from './ProductImage';
import RecentlyViewed from '../RecentlyViewed';

const Details = () => {
	const dispatch = useDispatch();

	const [LottieAnim, setLottieAnim] = useState();

	let currentUser = useSelector((state) => state.auth.isAuthenticated);
	const product = useSelector((state) => state.products?.product);
	const cartProducts = useSelector(
		(state) => state.products?.cartDetails?.cartProducts
	);
	const cartProductQuantity = useSelector(
		(state) => state.products?.cartDetails?.cartProductQuantity
	);
	const productLoading = useSelector((state) => state.products?.isLoading);

	useEffect(() => {
		fetch('https://assets7.lottiefiles.com/packages/lf20_rwq6ciql.json', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((responseData) => {
				// console.log(responseData);
				setLottieAnim(responseData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// useEffect(() => {
	// 	dispatch(getCartProducts());
	// }, []);

	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			{product?.map((item) => {
				const { _id, name, brand, salePrice, price, imageUrl } = item;

				let dollarPrice = parseInt(salePrice) / 108;

				let filteredCartItem = cartProducts?.filter((product) => {
					return product._id === _id;
				});

				let filteredCartItemQuantity = cartProductQuantity?.filter(
					(product) => {
						return product.productId === _id;
					}
				);

				return (
					<Fragment key={_id}>
						<ProductImage imageUrl={imageUrl} />
						<View style={styles.productDetails}>
							<TouchableOpacity style={styles.button}>
								<Text style={{ color: '#fff' }}>Official Store</Text>
							</TouchableOpacity>
							<Text style={{ marginTop: 5 }}>{name}</Text>
							<Text style={{ marginTop: 5 }}>Brand: {brand}</Text>
							<Text style={styles.price}>
								US ${numberWithCommas(dollarPrice.toFixed(2))}
							</Text>
							{/* <Text style={styles.initialPrice}>KSh {price}</Text> */}
							<Text style={styles.location}>
								+ shipping from KSh 96 to Dagoretti South - Ngand'o/Riruta
							</Text>
							{filteredCartItem?.length > 0 ? (
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<TouchableOpacity
										disabled={
											filteredCartItemQuantity[0]?.quantity === 1 ? true : false
										}
										onPress={() => dispatch(decreaseCartProductQuantity(_id))}
										style={style.iconButton}
									>
										<AntDesign name="minuscircle" size={22} color="#fff" />
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
										<AntDesign name="pluscircle" size={22} color="#fff" />
									</TouchableOpacity>
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
													Add to Cart
												</Text>
											</View>
										</TouchableOpacity>
									) : (
										<TouchableOpacity style={style.button}>
											<View
												style={{
													width: '50%',
													flexDirection: 'row',
													justifyContent: 'space-around',
													alignItems: 'center',
												}}
											>
												<Text style={{ color: '#fff', fontSize: 18 }}>
													Sign in
												</Text>
											</View>
										</TouchableOpacity>
									)}
								</>
							)}
						</View>
						<View>
							<Text style={styles.promotionTitle}>PROMOTIONS</Text>
							<View style={styles.promotionInnerContainer}>
								<View style={styles.promotionDetail}>
									<MaterialCommunityIcons
										name="truck-delivery-outline"
										size={24}
										color="black"
									/>
									<Text style={styles.promotionText}>
										Free delivery in Nairobi & Mombasa on orders above KShs 1000
										(excluding large items)
									</Text>
								</View>
								<View style={[styles.promotionDetail, { marginTop: 5 }]}>
									<AntDesign name="Safety" size={24} color="black" />
									<Text style={styles.promotionText}>
										Easy and safer payments via the Lufumart App
									</Text>
								</View>
							</View>
						</View>
						<View>
							<Text style={styles.promotionTitle}>DELIVERY & RETURNS</Text>
						</View>
						<View>
							<Text style={styles.promotionTitle}>PRODUCT DETAILS</Text>
							<View style={styles.itemInnerContainer}>
								<View>
									<View style={styles.itemHeader}>
										<Text style={styles.itemTitle}>Description</Text>
										<AntDesign name="right" size={18} color="black" />
									</View>
									<Text>Display: 6.5" PLS IPS</Text>
									<Text>Memory: 64GB Internal, 4GB RAM</Text>
									<Text>OS: Android 10</Text>
									<Text>Rear Camera: 48MP + 2MP + 2MP</Text>
								</View>
							</View>
						</View>
						<View>
							<Text style={styles.promotionTitle}>CUSTOMERS ALSO VIEWED</Text>
						</View>
						<View>
							<Text style={styles.promotionTitle}>
								VERIFIED CUSTOMER FEEDBACK
							</Text>
						</View>
						<View>
							<Text style={styles.promotionTitle}>CUSTOMERS ALSO BOUGHT</Text>
						</View>
						<View>
							<Text style={styles.promotionTitle}>SELLER INFORMATION</Text>
							<View style={styles.sellerInnerContainer}>
								<View style={styles.itemHeader}>
									<Text style={styles.itemTitle}>Avenue Phones</Text>
									<AntDesign name="right" size={18} color="black" />
								</View>
							</View>
						</View>
						<View>
							<Text style={styles.promotionTitle}>RECENTLY VIEWED</Text>
							<RecentlyViewed />
						</View>
					</Fragment>
				);
			})}
		</ScrollView>
	);
};

export default Details;

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
});
