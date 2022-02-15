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

const TopSellingItems = () => {
	return (
		<View style={styles.container}>
			{TopSellingProducts?.map((item, index) => {
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
		</View>
	);
};

export default TopSellingItems;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	product: {
		width: 165,
		height: 200,
		margin: 5,
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

const TopSellingProducts = [
	{
		name: 'Medium size bag',
		price: 9999,
		vat: 199,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896019/samples/ecommerce/gh-best-laptop-backpacks-1624630728_iytabw.jpg',
	},
	{
		name: 'Black & Grey bag',
		price: 8999,
		vat: 319,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896014/samples/ecommerce/91sLOZjNWHL._AC_SY450__zf6mkr.jpg',
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
		name: 'Two black bag',
		price: 5699,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896007/samples/ecommerce/bestlaptopbags-1638299392_yqhsjc.jpg',
	},
	{
		name: 'Leather bag',
		price: 4699,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644896005/samples/ecommerce/270192-1600x1030-designer-laptop-bags-blending-elegance-function_mdwhko.jpg',
	},
];
