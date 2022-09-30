import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import {
	getProductHomeCategories,
	getProductsByCategory,
	getCurrentCategory,
} from '../../../store/actions/product-actions';

const ShopCategories = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mounted = useRef(false);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const productCategories = useSelector(
		(state) => state.products?.productHomeCategories
	);

	useEffect(() => {
		// set a clean up flag
		mounted.current = true;

		if (mounted.current) {
			dispatch(getProductHomeCategories());
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	const viewedProduct = (category) => {
		const data = {
			_id: category?._id,
			page: 1,
		};
		dispatch(getProductsByCategory(data));
		dispatch(getCurrentCategory(category));
		navigation.navigate('HomeProductsByCategoryScreen');
	};

	return (
		<View style={styles.container}>
			{productCategories?.map((item, index) => {
				const { name, imageUrl, translations } = item;
				return (
					<TouchableOpacity key={index} onPress={() => viewedProduct(item)}>
						<View style={styles.product}>
							<View style={styles.imageContainer}>
								<Image
									source={{
										uri: `${imageUrl}`,
									}}
									style={styles.image}
								/>
							</View>
							<View style={{ paddingHorizontal: 10 }}>
								<Text
									numberOfLines={1}
									style={{
										paddingVertical: 5,
										fontSize: 12,
									}}
								>
									{isEnglish
										? translations[0]?.en[0]?.name
										: translations[0]?.fr[0]?.name}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default ShopCategories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	product: {
		width: 100,
		marginVertical: 5,
		marginHorizontal: 2,
	},
	imageContainer: {
		backgroundColor: '#f3f7ff',
		marginVertical: 5,
		height: 80,
		width: 80,
		borderRadius: 150 / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 150 / 2,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#f3f7ff',
	},
});
