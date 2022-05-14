import React, { useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { numberWithCommas } from '../../../utils/NumberWithCommas';
import {
	getProduct,
	getProducts,
	getCartProducts,
	addProductToCart,
	decreaseCartProductQuantity,
} from '../../../store/actions/product-actions';

const FreeShippingProducts = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const products = useSelector((state) => state.products?.products);

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const viewedProduct = (product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('HomeDetailsScreen');
	};
	return (
		<>
			<FlatList
				data={products}
				keyExtractor={(item, index) => `${item}-${index}`}
				horizontal
				style={{ flexGrow: 0 }}
				contentContainerStyle={{ padding: 5 }}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item: product }) => {
					const { name, salePrice, imageUrl } = product;
					let dollarPrice = parseInt(salePrice) / 108;
					return (
						<TouchableOpacity>
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
										US ${numberWithCommas(dollarPrice.toFixed(2))}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
};

export default FreeShippingProducts;

const styles = StyleSheet.create({
	product: {
		width: 150,
		height: 180,
		marginHorizontal: 8,
	},
	imageContainer: {
		backgroundColor: '#f3f7ff',
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
