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

const Laptops = () => {
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

export default Laptops;

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
		name: 'Macbook air',
		price: 69999,
		vat: 1799,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898655/samples/ecommerce/vpavic_4291_20201113_0337_Edit.0_wowotl.jpg',
	},
	{
		name: 'Student laptop',
		price: 84699,
		vat: 2196,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898640/samples/ecommerce/best-macbooks-roundup-header_xn5bs8.jpg',
	},
	{
		name: 'Medium macbook',
		price: 35999,
		vat: 1279,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898626/samples/ecommerce/hero-image.fill.size_1248x702.v1623391330_slbryj.jpg',
	},
	{
		name: 'Travel laptop',
		price: 76899,
		vat: 1897,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898589/samples/ecommerce/laptops-lowres-2x1-_ovy2ih.jpg',
	},
	{
		name: 'Backpack laptop',
		price: 96899,
		vat: 1237,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898562/samples/ecommerce/bf-laptop-deals-pcw-9_t1dmcz.jpg',
	},
	{
		name: 'Study laptop',
		price: 76899,
		vat: 1637,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898570/samples/ecommerce/img-5704_ds77hk.jpg',
	},
	{
		name: 'Normal laptop',
		price: 56899,
		vat: 1167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898579/samples/ecommerce/cheap-laptops-1627569831.jpg_tnc9be.jpg',
	},
];
