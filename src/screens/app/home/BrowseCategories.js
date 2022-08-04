import React, { useEffect, useCallback, useRef } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getProductCategories } from '../../../store/actions/product-actions';
import { hideTabbar } from '../../../store/actions/app-settings-actions';

const BrowseCategories = () => {
	const route = useRoute();
	const dispatch = useDispatch();
	const mounted = useRef(false);

	const productCategories = useSelector(
		(state) => state.products?.productCategories
	);

	useEffect(() => {
		mounted.current = true;
		if (mounted.current) {
			fetchCategories();
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'HomeCategoriesScreen') {
			if (mounted.current) {
				dispatch(hideTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	const fetchCategories = useCallback(() => {
		dispatch(getProductCategories());
	}, []);

	const renderEmpty = () => (
		<View style={styles.emptyText}>
			<Text>No products at the moment</Text>
		</View>
	);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
				alignItems: 'center',
			}}
		>
			{productCategories?.length > 0 && (
				<FlatList
					data={productCategories}
					keyExtractor={(item, index) => `${item}-${index}`}
					numColumns={2}
					style={{ flexGrow: 0 }}
					ListEmptyComponent={renderEmpty}
					// onEndReachedThreshold={0.2}
					// onEndReached={fetchMoreData}
					contentContainerStyle={{ padding: 5 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item: category }) => {
						const { name, imageUrl } = category;

						return (
							<TouchableOpacity>
								<View style={styles.product}>
									<View style={styles.imageContainer}>
										<Image
											source={{
												uri: `${imageUrl && imageUrl}`,
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
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			)}
		</View>
	);
};

export default BrowseCategories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
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
