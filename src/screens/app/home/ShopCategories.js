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
import { getProductHomeCategories } from '../../../store/actions/product-actions';

const ShopCategories = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const productCategories = useSelector(
		(state) => state.products?.productHomeCategories
	);

	useEffect(() => {
		dispatch(getProductHomeCategories());
	}, []);
	return (
		<View style={styles.container}>
			{productCategories?.map((item, index) => {
				const { name, imageUrl } = item;
				return (
					<TouchableOpacity key={index}>
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
									{name}
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
