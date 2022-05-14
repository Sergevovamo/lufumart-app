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

const FlashSales = () => {
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
					const { imageUrl } = product;
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
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</>
	);
};

export default FlashSales;

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
