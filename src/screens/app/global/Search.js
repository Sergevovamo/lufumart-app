import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	Keyboard,
	Image,
	TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as Localization from 'expo-localization';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import {
	searchProducts,
	getProduct,
} from '../../../store/actions/product-actions';
import { numberWithCommas } from '../../../utils/NumberWithCommas';

const Search = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const isLoading = useSelector((state) => state.auth.isLoading);
	const products = useSelector((state) => state.products?.searchProducts);

	const [searchBarFocused, setSearchBarFocused] = useState(false);
	const [toggleSearch, setToggleSearch] = useState(false);

	const [page, setPage] = useState(1);
	const [textInputValue, setTextInputValue] = React.useState('');

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setSearchBarFocused(true);
				setToggleSearch(true);
			}
		);

		const keyboardWillShowListener = Keyboard.addListener(
			'keyboardWillShow',
			() => {
				setSearchBarFocused(true);
				setToggleSearch(true);
			}
		);

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setSearchBarFocused(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
			keyboardWillShowListener.remove();
		};
	}, []);

	useEffect(() => {
		if (textInputValue !== '') {
			const payload = {
				page,
				searchTerm: textInputValue,
				limit: 50,
			};

			dispatch(searchProducts(payload));
		}
	}, [page, textInputValue]);

	const handleSearch = (name) => {
		setTextInputValue(name);
		setToggleSearch(false);
	};

	const exitSearchMode = () => {
		setToggleSearch(false);
		Keyboard.dismiss();
	};

	const renderEmpty = () => (
		<View style={styles.emptyText}>
			<Text>
				{isEnglish
					? 'Start typing to search lufumart.'
					: `Commencez à taper pour rechercher lufumart.`}
			</Text>
		</View>
	);

	const viewedProduct = (product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('HomeSearchDetailsScreen');
	};

	return (
		<View style={{ backgroundColor: '#fffff7', flex: 1 }}>
			<View
				style={{
					height: 80,
					backgroundColor: '#f68b1e',
					justifyContent: 'center',
					paddingHorizontal: 5,
				}}
			>
				<Animatable.View
					animation="slideInRight"
					duration={500}
					style={{
						height: 50,
						borderRadius: 7,
						backgroundColor: 'white',
						flexDirection: 'row',
						padding: 5,
						alignItems: 'center',
					}}
				>
					<Animatable.View
						animation={toggleSearch ? 'fadeInLeft' : 'fadeInRight'}
						duration={400}
					>
						{toggleSearch ? (
							<TouchableOpacity onPress={exitSearchMode}>
								<AntDesign name="close" size={24} color="black" />
							</TouchableOpacity>
						) : (
							<Ionicons name="ios-search" size={24} color="black" />
						)}
					</Animatable.View>
					{/* Search products for price comparison */}
					<TextInput
						value={textInputValue}
						onChangeText={(text) => setTextInputValue(text)}
						placeholder={
							isEnglish
								? 'Search products | Shopping cart | Comparison'
								: `Rechercher des produits | Panier | Comparaison`
						}
						style={{ fontSize: 13, marginLeft: 15, flex: 1 }}
					/>
				</Animatable.View>
			</View>
			<View>
				{toggleSearch ? (
					<FlatList
						style={{
							height: '100%',
							backgroundColor: searchBarFocused
								? 'rgba(0,0,0,0.3)'
								: 'rgba(0,0,0,0.3)',
						}}
						keyExtractor={(item, index) => `${item}-${index}`}
						data={products}
						renderItem={({ item: product }) => {
							const { name, translations } = product;
							return (
								<TouchableOpacity onPress={() => handleSearch(name)}>
									<Text style={{ padding: 20, fontSize: 18 }}>{name}</Text>
								</TouchableOpacity>
							);
						}}
					/>
				) : (
					<FlatList
						key={2}
						keyExtractor={(item, index) => `${item}-${index}`}
						numColumns={2}
						style={{ flexGrow: 0 }}
						ListEmptyComponent={renderEmpty}
						data={products}
						// onEndReachedThreshold={0.2}
						// onEndReached={fetchMoreData}
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
		</View>
	);
};

export default Search;

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
		// flex: 1,
		marginTop: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
