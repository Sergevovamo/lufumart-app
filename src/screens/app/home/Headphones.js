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

const Headphones = () => {
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

export default Headphones;

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
		name: 'Standard Headphones',
		price: 6999,
		vat: 199,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg',
	},
	{
		name: 'Student Headphones',
		price: 4699,
		vat: 196,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/NoiseCanceling_atzjnn.png',
	},
	{
		name: 'Noise cancellation',
		price: 5999,
		vat: 179,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843145/samples/ecommerce/wired_20headphones_my2zia.png',
	},
	{
		name: 'Headphones & earpods',
		price: 6899,
		vat: 197,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/v1644843148/samples/ecommerce/d3c1e85ae2db240d4c7b31b35a09067095-best-headphones-lede.2x.rsocial.w600_mdswuk.jpg',
	},
	{
		name: 'Airpods',
		price: 2899,
		vat: 127,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/v1644899386/samples/ecommerce/61ZRU9gnbxL._AC_SL1500__b9ca4z.jpg',
	},
	{
		name: 'Airpods 3',
		price: 3899,
		vat: 137,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644899363/samples/ecommerce/MWP22_navamo.jpg',
	},
];
