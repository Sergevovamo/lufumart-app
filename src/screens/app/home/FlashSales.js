import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import { numberWithCommas } from '../../../utils/NumberWithCommas';
import {
	getProduct,
	getProducts,
	getFlashSaleProducts,
	getCartProducts,
	addProductToCart,
	decreaseCartProductQuantity,
} from '../../../store/actions/product-actions';
import { hideTabbar } from '../../../store/actions/app-settings-actions';

const FlashSales = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const mounted = useRef(false);

	const isLoading = useSelector((state) => state.products?.isLoading);
	const products = useSelector((state) => state.products?.getFlashSaleProducts);

	const [isOffline, setOfflineStatus] = useState(false);

	NetInfo.fetch().then((networkState) => {
		// console.log('Connection type - ', networkState.type);
		// console.log('Is connected? - ', networkState.isConnected);
	});

	useEffect(() => {
		// set a clean up flag
		// mounted.current = true;
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setOfflineStatus(offline);
		});

		// if (mounted.current) {
		fetchProducts();
		// }
		return () => removeNetInfoSubscription();

		// return () => {
		// 	// cancel subscription to useEffect
		// 	mounted.current = false;
		// };
	}, []);

	const fetchProducts = useCallback(() => {
		dispatch(getFlashSaleProducts());
	}, []);

	const viewedProduct = useCallback((product) => {
		dispatch(getProduct(product._id));
		navigation.navigate('HomeDetailsScreen');
		dispatch(hideTabbar());
	}, []);
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
							</View>
						</TouchableOpacity>
					);
				}}
			/>

			<NoInternetModal
				show={isOffline}
				onRetry={fetchProducts}
				isRetrying={isLoading}
			/>
		</>
	);
};

export default memo(FlashSales);

const NoInternetModal = ({ show, onRetry, isRetrying }) => (
	<Modal isVisible={show} style={styles.modal} animationInTiming={600}>
		<View style={styles.modalContainer}>
			<Text style={styles.modalTitle}>Connection Error</Text>
			<Text style={styles.modalText}>
				Oops! Looks like your device is not connected to the Internet.
			</Text>
			<Button onPress={onRetry} disabled={isRetrying}>
				Try Again
			</Button>
		</View>
	</Modal>
);

const Button = ({ children, ...props }) => (
	<TouchableOpacity style={styles.button} {...props}>
		<Text style={styles.buttonText}>{children}</Text>
	</TouchableOpacity>
);

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
	// Network Connection modal
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	modalContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 40,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: '600',
	},
	modalText: {
		fontSize: 18,
		color: '#555',
		marginTop: 14,
		textAlign: 'center',
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#000',
		paddingVertical: 12,
		paddingHorizontal: 16,
		width: '100%',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
	},
});
