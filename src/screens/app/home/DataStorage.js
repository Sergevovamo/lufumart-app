import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import { numberWithCommas } from '../../../utils/NumberWithCommas';

const DataStorage = () => {
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
			{viewedProducts.map((item, index) => {
				const { name, price, vat, imgUrl } = item;
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
							<View
								style={{
									paddingVertical: 5,
									borderBottomColor: 'black',
									borderBottomWidth: 1,
								}}
							/>
							<View style={{ paddingHorizontal: 10 }}>
								<Text style={{ paddingVertical: 5 }}>{name}</Text>
								<Text style={{ fontWeight: 'bold' }}>
									KSh. {numberWithCommas(price)}
								</Text>
								<Text style={{ color: 'gray' }}>
									KSh. {numberWithCommas(vat)}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default DataStorage;

const styles = StyleSheet.create({
	product: {
		width: 150,
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
		height: 100,
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

const viewedProducts = [
	{
		name: 'SanDisks',
		price: 699,
		vat: 19,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899634/samples/ecommerce/16-gb-Flash-disk_gjchnu.jpg',
	},
	{
		name: 'Steel SanDisks',
		price: 899,
		vat: 96,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899663/samples/ecommerce/flash-drive_ksijyv.png',
	},
	{
		name: 'Flash Disk 16GB',
		price: 179,
		vat: 79,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899728/samples/ecommerce/16gb-imation_apji0n.jpg',
	},
];
