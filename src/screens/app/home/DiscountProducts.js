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

const DiscountProducts = () => {
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

export default DiscountProducts;

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
		name: 'Watches',
		price: 6999,
		vat: 299,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900190/samples/ecommerce/074c381a539a983b965c8d80f166cfc1_zlsk0r.jpg',
	},
	{
		name: 'Ladies shoes',
		price: 8699,
		vat: 296,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900109/samples/ecommerce/51WOGmwXm3L._AC_UY395__gpv5bo.jpg',
	},
	{
		name: 'Summer dress',
		price: 3599,
		vat: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900067/samples/ecommerce/1620399389-best-amazon-dresses-for-women-ruffle-dress-1620399361.png_dt5c48.png',
	},
	{
		name: 'Travel Hoodie',
		price: 899,
		vat: 97,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900359/samples/ecommerce/elan-75-years-hoodie-ptec7520-3d_yh4gid.png',
	},
	{
		name: 'Hoodie',
		price: 999,
		vat: 17,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900311/samples/ecommerce/HNS_S5264551666_OxfordGreyHeatherEbony_Coed_aqnns8.jpg',
	},
	{
		name: 'Hoodie',
		price: 699,
		vat: 37,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900266/samples/ecommerce/mt03614ag_nb_40_i_pkelzz.jpg',
	},
	{
		name: 'Macbook laptop',
		price: 56899,
		vat: 1167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898579/samples/ecommerce/cheap-laptops-1627569831.jpg_tnc9be.jpg',
	},
	{
		name: 'Men Shoe',
		price: 6499,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900599/samples/ecommerce/best-shoes-1610418585.jpg_u163oy.jpg',
	},
	{
		name: 'Men Shoe',
		price: 2499,
		vat: 107,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900631/samples/ecommerce/5b240ed61ae66253008b5228_iakair.jpg',
	},
	{
		name: 'Men Shoe',
		price: 4499,
		vat: 117,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900681/samples/ecommerce/MENS-DRESS-OXFORDS-LOAFERS-DRIVERS-FEBRUARY-TRIPTYCH-500X500_arjwas.jpg',
	},
	{
		name: 'Cornflakes',
		price: 499,
		vat: 34,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644900737/samples/ecommerce/1_lbpy6e.jpg',
	},
];
