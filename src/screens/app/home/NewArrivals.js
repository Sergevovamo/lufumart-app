import React, { useEffect, useCallback, useRef, memo } from 'react';
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
import * as Localization from 'expo-localization';
import { numberWithCommas } from '../../../utils/NumberWithCommas';
import {
	getProduct,
	getNewArrivalsProducts,
} from '../../../store/actions/product-actions';
import { hideTabbar } from '../../../store/actions/app-settings-actions';

const NewArrivals = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mounted = useRef(false);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';
	const products = useSelector(
		(state) => state.products?.getNewArrivalsProducts
	);

	useEffect(() => {
		// set a clean up flag
		mounted.current = true;

		if (mounted.current) {
			fetchProducts();
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	const fetchProducts = useCallback(() => {
		dispatch(getNewArrivalsProducts());
	}, []);

	const viewedProduct = (product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('HomeDetailsScreen');
		dispatch(hideTabbar());
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
					const { name, salePrice, imageUrl, translations } = product;

					return (
						<TouchableOpacity onPress={() => viewedProduct(product)}>
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
										{isEnglish
											? translations[0]?.en[0]?.name
											: translations[0]?.fr[0]?.name}
									</Text>
									<Text style={{ fontWeight: 'bold' }}>
										US ${numberWithCommas(salePrice)}
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

export default memo(NewArrivals);

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
