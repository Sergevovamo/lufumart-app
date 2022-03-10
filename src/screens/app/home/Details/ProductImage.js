import {
	View,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

const ProductImage = ({ imageUrl }) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{
				paddingTop: 5,
				width: '100%',
				paddingBottom: 15,
				paddingLeft: 10,
			}}
		>
			{imageUrl?.map((imgUrl, index) => {
				return (
					<TouchableOpacity key={index}>
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
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default ProductImage;

const styles = StyleSheet.create({
	product: {
		width: 250,
		height: 200,
		...Platform.select({
			ios: {
				shadowColor: 'gray',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.5,
			},
			android: {
				elevation: -5, // its negative to allow effective box shadow
				position: 'relative',
				borderWidth: 1,
				borderColor: '#f3f3f3',
				zIndex: 50,
			},
		}),
		marginHorizontal: 8,
		backgroundColor: '#fff',
	},
	imageContainer: {
		backgroundColor: '#fff',
		marginVertical: 5,
		height: 200,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		resizeMode: 'contain',
		width: '85%',
		height: '100%',
	},
});
