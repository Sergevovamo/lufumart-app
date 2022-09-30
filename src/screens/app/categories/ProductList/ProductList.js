import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	Button,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Localization from 'expo-localization';

import { numberWithCommas } from '../../../../utils/NumberWithCommas';
import {
	getMoreProductsBySubCategory,
	getProduct,
} from '../../../../store/actions/product-actions';
import { hideTabbar } from '../../../../store/actions/app-settings-actions';

const ProductList = () => {
	const route = useRoute();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mounted = useRef(false);

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [page, setPage] = useState(1);

	useEffect(() => {
		if (page > 1) {
			requestAPI();
		}
		// console.log('CURRENT PAGE', page);
	}, [page, requestAPI]);

	// Sub category products
	const products = useSelector((state) => state.products);
	// Current Sub Category Title
	const currentSubCategoryId = useSelector(
		(state) => state.products?.currentSubCategoryTitle?._id
	);

	// get products by sub category
	const getMoreProductSubCategories = useSelector(
		(state) => state.products?.getMoreProductsBySubCategory
	);

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'ProductListScreen') {
			if (mounted.current) {
				dispatch(hideTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	// useCallback prevent re-renders to avoid duplicate calls in the api
	const requestAPI = useCallback(() => {
		let params = [`${currentSubCategoryId}`];

		if (params.length > 0) {
			// Convert array to query string
			let paramsToQueryString = params
				?.map(function (el, idx) {
					return 'subCategoryId[' + idx + ']=' + el;
				})
				.join('&');

			const data = {
				page: page,
				subCategoryId: paramsToQueryString,
			};
			dispatch(getMoreProductsBySubCategory(data));
		}
	}, [page]);

	const fetchMoreData = () => {
		if (!products.isListEnd && !products.moreLoading) {
			setPage(page + 1);
		}
	};

	const renderFooter = () => (
		<View style={styles.footerText}>
			{products.moreLoading && <ActivityIndicator />}
			{products.isListEnd && (
				<Text>
					{isEnglish
						? 'No more products at the moment.'
						: `Plus de produits pour le moment..`}
				</Text>
			)}
		</View>
	);

	const renderEmpty = () => (
		<View style={styles.emptyText}>
			<Text>
				{isEnglish
					? 'No products at the moment.'
					: `Aucun produit pour le moment.`}
			</Text>
			{/* <Button onPress={() => requestAPI()} title="Refresh" /> */}
		</View>
	);

	const viewedProduct = (product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('CategoriesProductListDetailsScreen');
		// dispatch(hideTabbar());
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
				alignItems: 'center',
			}}
		>
			{getMoreProductsBySubCategory?.length > 0 && (
				<FlatList
					data={getMoreProductSubCategories}
					keyExtractor={(item, index) => `${item}-${index}`}
					numColumns={2}
					style={{ flexGrow: 0 }}
					ListEmptyComponent={renderEmpty}
					ListFooterComponent={renderFooter}
					onEndReachedThreshold={0.5}
					onEndReached={fetchMoreData}
					contentContainerStyle={{ padding: 5 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item: product }) => {
						const { salePrice, imageUrl, translations } = product;

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
			)}
		</View>
	);
};

export default ProductList;

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
