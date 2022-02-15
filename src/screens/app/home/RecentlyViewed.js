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

const RecentlyViewed = () => {
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
						<View style={styles.recentProduct}>
							<View style={styles.recentImageContainer}>
								<Image
									source={{
										uri: `${imgUrl}`,
									}}
									style={styles.recentImage}
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

export default RecentlyViewed;

const styles = StyleSheet.create({
	recentProduct: {
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
	recentImageContainer: {
		backgroundColor: '#fff',
		marginVertical: 5,
		height: 100,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	recentImage: {
		resizeMode: 'contain',
		width: '85%',
		height: '100%',
	},
});

const viewedProducts = [
	{
		name: 'Baby socks',
		price: 699,
		vat: 179,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531592/cool_socks_z2eshw.jpg',
	},
	{
		name: 'Baby shoes',
		price: 899,
		vat: 219,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634534482/shoe-landing_pafayc.jpg',
	},
	{
		name: 'Baby red socks',
		price: 399,
		vat: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531592/socks_wv5fk0.png',
	},
	{
		name: 'Baby winter cloth',
		price: 769,
		vat: 167,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1634531590/child_m8pjmu.jpg',
	},
];
