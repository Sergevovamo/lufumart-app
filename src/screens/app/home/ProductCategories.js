import React, { useEffect, useState, useCallback, useRef, memo } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { numberWithCommas } from '../../../utils/NumberWithCommas';
import {
	getProduct,
	getProductsByCategory,
} from '../../../store/actions/product-actions';
import { hideTabbar } from '../../../store/actions/app-settings-actions';

const ProductCategories = () => {
	const route = useRoute();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mounted = useRef(false);

	const isLoading = useSelector((state) => state.products?.isLoading);
	const products = useSelector((state) => state.products?.productsByCategory);

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

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'HomeProductsByCategoryScreen') {
			if (mounted.current) {
				dispatch(hideTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	const fetchProducts = useCallback(() => {
		// dispatch(getProductsByCategory());
	}, []);

	const fetchMoreData = useCallback(() => {
		// dispatch(getProductsByCategory());
	}, []);

	const renderFooter = () => (
		<View style={styles.footerText}>
			{products.moreLoading && <ActivityIndicator />}
			{products.isListEnd && <Text>No more products at the moment</Text>}
		</View>
	);

	const renderEmpty = () => (
		<View style={styles.emptyText}>
			<Text>No products at the moment</Text>
			{/* <Button onPress={() => requestAPI()} title="Refresh" /> */}
		</View>
	);

	const viewedProduct = (product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('HomeProductsByCategoryDetailsScreen');
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
				alignItems: 'center',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{products?.length > 0 && (
				<FlatList
					data={products}
					keyExtractor={(item, index) => `${item}-${index}`}
					numColumns={2}
					style={{ flexGrow: 0 }}
					ListEmptyComponent={renderEmpty}
					ListFooterComponent={renderFooter}
					onEndReachedThreshold={0.2}
					onEndReached={fetchMoreData}
					contentContainerStyle={{ padding: 5 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item: product }) => {
						const { name, salePrice, imageUrl } = product;

						return (
							<TouchableOpacity onPress={() => viewedProduct(product)}>
								<View style={styles.product}>
									<View style={styles.imageContainer}>
										<Image
											source={{
												uri: `${imageUrl && imageUrl[0]}`,
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
											US ${numberWithCommas(salePrice)}
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

export default memo(ProductCategories);

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
	title: {
		fontSize: 25,
		fontWeight: '700',
		marginVertical: 15,
		marginHorizontal: 10,
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footerText: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	emptyText: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
