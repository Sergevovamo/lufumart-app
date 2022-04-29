import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	Ionicons,
	AntDesign,
	Feather,
	FontAwesome5,
	Fontisto,
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

import { numberWithCommas } from '../../../utils/NumberWithCommas';

const Checkout = () => {
	const dispatch = useDispatch();

	const cartProducts = useSelector(
		(state) => state.products?.cartDetails?.cartProducts
	);

	const cartProductTotal = useSelector(
		(state) => state.products?.cartDetails?.cartProductTotal
	);
	return (
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
						<TouchableOpacity style={styles.locationWrapper}>
							<View>
								<Text>20845 Oakridge Farm Lane</Text>
								<Text>New York (NYC)</Text>
							</View>
							<View>
								<AntDesign name="right" size={20} color="gray" />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.paymentContainer}>
					<Text style={{ fontSize: 18, paddingBottom: 5 }}>Payment Method</Text>
					<View style={styles.paymentWrapper}>
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
					</View>
					<View style={styles.paymentWrapper}>
						<View style={styles.iconWrapper}>
							<Fontisto name="mastercard" size={18} color="#fff" />
						</View>
						<TouchableOpacity style={styles.cardWrapper}>
							<View>
								<Text style={{ fontSize: 18 }}>Master Card</Text>
								<Text style={{ color: 'gray', fontSize: 12 }}>
									... ... 3675 0340
								</Text>
							</View>
							<View>
								<FontAwesome5 name="dot-circle" size={24} color="black" />
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.paymentWrapper}>
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
					</View>
				</View>
				<View style={styles.cartContainer}>
					<View style={styles.cartHeader}>
						<Text style={{ fontSize: 18, paddingBottom: 5 }}>My Cart</Text>
						<TouchableOpacity>
							<AntDesign name="right" size={20} color="gray" />
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{
							paddingTop: 5,
							width: '100%',
							height: '100%',
							paddingBottom: 15,
						}}
					>
						{cartProducts?.map((item, index) => {
							const { _id, name, price, imageUrl } = item;
							return (
								<View key={index} style={styles.cartProduct}>
									<View style={styles.imageContainer}>
										<Image
											source={{ uri: `${imageUrl[0]}` }}
											style={styles.image}
										/>
									</View>
									<View style={styles.productDetails}>
										<View>
											<Text style={{ fontSize: 13 }}>{name}</Text>
											<Text style={{ marginTop: 15, fontSize: 12 }}>
												KSh. {numberWithCommas(price)}
											</Text>
										</View>
									</View>
								</View>
							);
						})}
					</ScrollView>
				</View>
				<View style={styles.productTotal}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>
						Total
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5 }}>
						KSh. {numberWithCommas(parseInt(cartProductTotal?.total))}
					</Text>
				</View>
				<TouchableOpacity
					// onPress={() => navigation.navigate('CheckoutScreen')}
					style={styles.button}
				>
					<Text style={{ color: '#fff', fontSize: 18 }}>Pay Now</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		minHeight: height,
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
	cardWrapper: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
	},
	cartContainer: {
		width: '100%',
		minHeight: 150,
		marginVertical: 15,
		paddingHorizontal: 18,
		height: 100,
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
	imageContainer: {
		width: '50%',
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
