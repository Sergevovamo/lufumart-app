import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, StyleSheet, Image } from 'react-native';

const ProductImageZoom = () => {
	const product = useSelector((state) => state.products?.product);

	return (
		<ScrollView
			ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				backgroundColor: '#fffff7',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{product[0]?.imageUrl?.map((imgUrl, index) => {
				return (
					<View key={index}>
						<View style={styles.product}>
							<View style={styles.imageContainer}>
								<Image
									source={{
										uri: `${imgUrl}`,
									}}
									style={styles.image}
								/>
							</View>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
};

export default ProductImageZoom;

const styles = StyleSheet.create({
	product: {
		width: 350,
		height: 350,
		marginHorizontal: 5,
		backgroundColor: '#f3f7ff',
	},
	imageContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		width: '98%',
		height: '100%',
	},
});
