import React, { useEffect, useRef } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	Platform,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Localization from 'expo-localization';

import { getCustomerOrders } from '../../../store/actions/order-actions';
import { numberWithCommas } from '../../../utils/NumberWithCommas';

const { width, height } = Dimensions.get('screen');

const OpenOrders = () => {
	const dispatch = useDispatch();
	const mounted = useRef(false);

	const orders = useSelector((state) => state.order?.customerOrders);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	useEffect(() => {
		// set a clean up flag
		mounted.current = true;

		if (mounted.current) {
			dispatch(getCustomerOrders());
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
			}}
		>
			{orders?.length > 0 ? (
				<FlatList
					data={orders}
					keyExtractor={(item, index) => `${item}-${index}`}
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ padding: 5 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item: order }) => {
						const {
							_id,
							items,
							paymentMethod,
							orderNumber,
							shipDate,
							shippingFee,
							status,
							total,
						} = order;
						// console.log(order);

						return (
							<View key={_id} style={styles.productContainer}>
								<TouchableOpacity style={styles.imageContainer}>
									<Image
										source={{ uri: `${items[0].imageUrl[0]}` }}
										style={styles.image}
									/>
								</TouchableOpacity>
								<View style={styles.productDetails}>
									<View>
										<Text style={{ fontWeight: 'bold' }}>{orderNumber}</Text>
										<Text style={{ marginTop: 10 }}>
											Order price: US ${numberWithCommas(total)}
										</Text>
										<Text style={{ marginTop: 5 }}>
											Shipping fee: US ${numberWithCommas(shippingFee)}
										</Text>
										<Text style={{ marginTop: 15 }}>
											Order status:{' '}
											<Text style={{ color: '#f68b1e', fontWeight: 'bold' }}>
												{status}
											</Text>
										</Text>
										<Text style={{ marginTop: 5 }}>{paymentMethod}</Text>
									</View>
								</View>
							</View>
						);
					}}
				/>
			) : (
				<View
					style={{
						flex: 1,
						marginTop: 20,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View style={{ backgroundColor: 'white', padding: 20 }}>
						<Text>
							{isEnglish
								? 'Your do not have any orders yet.'
								: "Vous n'avez pas encore de commandes."}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default OpenOrders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	productContainer: {
		padding: 1,
		marginTop: 10,
		flexDirection: 'row',
		width: Platform.OS === 'ios' ? width * 0.9 : width * 0.95,
		height: 200,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	imageContainer: {
		width: '40%',
		height: '100%',
		borderRadius: 10,
		padding: 5,
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
	},
	image: {
		resizeMode: 'contain',
		width: '100%',
		height: '100%',
	},
	productDetails: {
		// alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		width: '65%',
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
		marginTop: 20,
		marginVertical: 35,
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
