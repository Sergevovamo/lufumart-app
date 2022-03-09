import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
	AntDesign,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';

import { numberWithCommas } from '../../../utils/NumberWithCommas';
import {
	getCartProducts,
	addProductToCart,
	removeProductToCart,
	decreaseCartProductQuantity,
} from '../../../store/actions/product-actions';

const { width, height } = Dimensions.get('screen');

const Cart = ({ navigation }) => {
	const dispatch = useDispatch();

	const cartProducts = useSelector(
		(state) => state.products?.cartProducts?.cartProducts
	);
	const cartProductQuantity = useSelector(
		(state) => state.products?.cartProducts?.cartProductQuantity
	);
	const total = useSelector((state) => state.products?.total);

	useEffect(() => {
		dispatch(getCartProducts());
	}, []);

	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<View style={styles.container}>
				{cartProducts?.length > 0 ? (
					cartProducts?.map((item, index) => {
						const { _id, name, price, imageUrl } = item;

						return (
							<View key={index} style={styles.productContainer}>
								<View style={styles.imageContainer}>
									<Image
										source={{ uri: `${imageUrl[0]}` }}
										style={styles.image}
									/>
								</View>
								<View style={styles.productDetails}>
									<View>
										<Text>{name}</Text>
										<Text style={{ marginTop: 5 }}>
											KSh. {numberWithCommas(price)}
										</Text>
									</View>
									<View
										style={{
											marginTop: 40,
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<TouchableOpacity
												onPress={() =>
													dispatch(decreaseCartProductQuantity(_id))
												}
											>
												<AntDesign name="minuscircle" size={18} color="black" />
											</TouchableOpacity>
											<Text style={{ paddingHorizontal: 15, fontSize: 18 }}>
												{cartProductQuantity[index]?.quantity}
											</Text>
											<TouchableOpacity
												onPress={() => dispatch(addProductToCart(_id))}
											>
												<AntDesign name="pluscircle" size={18} color="black" />
											</TouchableOpacity>
										</View>
										<View style={{ flexDirection: 'row' }}>
											<TouchableOpacity>
												<MaterialCommunityIcons
													name="heart-outline"
													size={22}
													color="black"
													style={{ paddingHorizontal: 15 }}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => dispatch(removeProductToCart(_id))}
											>
												<MaterialIcons name="delete" size={22} color="black" />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						);
					})
				) : (
					<View
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View style={{ backgroundColor: 'white', padding: 20 }}>
							<Text>Your cart is empty</Text>
						</View>
					</View>
				)}
				<TouchableOpacity style={styles.promoContainer}>
					<Text style={{ fontSize: 16 }}>Promo/Student Code or Vouchers</Text>
					<TouchableOpacity>
						<AntDesign name="right" size={20} color="black" />
					</TouchableOpacity>
				</TouchableOpacity>
				<View style={styles.productTotal}>
					<View style={styles.productTotalContainer}>
						<Text style={{ fontWeight: 'bold' }}>Sub Total</Text>
						<Text style={{ fontWeight: 'bold' }}>
							Ksh. {numberWithCommas(parseInt(total?.subTotal))}
						</Text>
					</View>
					<View style={styles.productTotalContainer}>
						<Text style={{ color: 'gray' }}>VAT</Text>
						<Text style={{ color: 'gray' }}>
							Ksh. {numberWithCommas(parseInt(total?.vat))}
						</Text>
					</View>
					<View
						style={{
							paddingVertical: 10,
							marginHorizontal: 18,
							borderBottomColor: 'black',
							borderBottomWidth: 1,
						}}
					/>
					<View style={styles.productTotalContainer}>
						<Text>Total</Text>
						<Text>Ksh. {numberWithCommas(parseInt(total?.total))}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => navigation.navigate('CheckoutScreen')}
					style={styles.button}
				>
					<Text style={{ color: '#fff', fontSize: 18 }}>Checkout</Text>
				</TouchableOpacity>
				<View style={styles.recentlyViewed}>
					<Text
						style={{
							fontSize: 20,
							color: '#000000',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Recently viewed
					</Text>
					<TouchableOpacity>
						<Text style={{ color: '#f68b1e', fontWeight: 'bold' }}>
							SEE ALL
						</Text>
					</TouchableOpacity>
				</View>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{
						paddingTop: 5,
						width: '100%',
						paddingBottom: 15,
						paddingLeft: 10,
					}}
				>
					{viewedProducts.map((item, index) => {
						const { name, price, vat, imgUrl } = item;
						return (
							<TouchableOpacity key={index}>
								<View style={styles.recentProduct}>
									<View style={styles.recentImageContainer}>
										<Image
											source={{
												uri: `${imgUrl}`,
											}}
											style={styles.recentImage}
										/>
									</View>
									<View
										style={{
											paddingVertical: 5,
											borderBottomColor: 'black',
											borderBottomWidth: 1,
										}}
									/>
									<View style={{ paddingHorizontal: 10 }}>
										<Text style={{ paddingVertical: 5 }}>{name}</Text>
										<Text style={{ fontWeight: 'bold' }}>
											KSh. {numberWithCommas(price)}
										</Text>
										<Text style={{ color: 'gray' }}>
											KSh. {numberWithCommas(vat)}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		</ScrollView>
	);
};

export default Cart;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	productContainer: {
		padding: 1,
		marginTop: 10,
		flexDirection: 'row',
		width: width * 0.9,
		height: 130,
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
	imageContainer: {
		width: '40%',
		height: '100%',
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
	},
	image: {
		resizeMode: 'cover',
		width: '100%',
		height: '100%',
	},
	productDetails: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		width: '60%',
	},
	promoContainer: {
		marginTop: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: 50,
		paddingHorizontal: 18,
	},
	productTotal: {
		marginTop: 25,
		width: '100%',
		height: 100,
	},
	productTotalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5,
		paddingHorizontal: 18,
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
	recentlyViewed: {
		flexDirection: 'row',
		width: '100%',
		marginVertical: 15,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
	},
	recentProduct: {
		width: 150,
		height: 200,
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
	recentImageContainer: {
		backgroundColor: '#fff',
		marginVertical: 5,
		height: 100,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	recentImage: {
		resizeMode: 'contain',
		width: '85%',
		height: '100%',
	},
});

const data = [
	{
		name: 'Baby Jeans & Shoes',
		price: 2999,
		quantity: 5,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531593/shoes_k0zakp.jpg',
	},
	{
		name: 'Jacket',
		price: 1999,
		quantity: 3,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634534341/baby-hero_gzfipc.jpg',
	},
];

const viewedProducts = [
	{
		name: 'Baby socks',
		price: 699,
		vat: 179,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531592/cool_socks_z2eshw.jpg',
	},
	{
		name: 'Baby shoes',
		price: 899,
		vat: 219,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634534482/shoe-landing_pafayc.jpg',
	},
	{
		name: 'Baby red socks',
		price: 399,
		vat: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531592/socks_wv5fk0.png',
	},
	{
		name: 'Baby winter cloth',
		price: 769,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531590/child_m8pjmu.jpg',
	},
];
