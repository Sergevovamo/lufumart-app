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

const FreeShippingProducts = () => {
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

export default FreeShippingProducts;

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
		name: 'Extra large bag',
		price: 3999,
		vat: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896010/samples/ecommerce/timbuk2_messenger_classic_messenger_bag_eco_monsoon_1108_4_1112_front_Timbuk2_ffffff80808100c3_1989_720x.progressive_lwwyoj.jpg',
	},
	{
		name: 'Black laptop bag',
		price: 7699,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896005/samples/ecommerce/91i8aaaNcqL._AC_SY450__lnpyjz.jpg',
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
