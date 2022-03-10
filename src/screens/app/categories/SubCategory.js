import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SubCategory = () => {
	return (
		<>
			{subCategory?.map((sub, index) => {
				const { name } = sub;
				return (
					<View key={index} style={styles.container}>
						<View style={styles.titleOnlyHeader}>
							<Text style={styles.subTitle}>{name}</Text>
							<TouchableOpacity>
								<Text style={{ color: '#f68b1e', fontWeight: 'bold' }}>
									SEE ALL
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={{
								paddingVertical: 5,
								borderBottomColor: 'black',
								borderBottomWidth: 1,
							}}
						/>
						<View style={styles.itemContainer}>
							{viewedProducts?.map((item, index) => {
								const { name, price, vat, imgUrl } = item;
								return (
									<TouchableOpacity key={index} style={styles.itemCard}>
										<View style={styles.imageContainer}>
											<Image
												source={{
													uri: `${imgUrl}`,
												}}
												style={styles.image}
											/>
										</View>
										<Text style={styles.itemText}>{name}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				);
			})}
		</>
	);
};

export default SubCategory;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		backgroundColor: '#fff',
		minHeight: 250,
		borderRadius: 5,
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
	},
	titleOnlyHeader: {
		marginHorizontal: 5,
		paddingTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	subTitle: {
		fontWeight: '700',
	},
	itemContainer: {
		marginTop: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: '#fff',
	},
	itemCard: {
		width: 85,
		minHeight: 85,
		marginVertical: 5,
		marginHorizontal: 2,
		backgroundColor: '#fff',
	},
	imageContainer: {
		backgroundColor: '#f3f7ff',
		alignItems: 'center',
		width: '100%',
		minHeight: 65,
		borderRadius: 5,
	},
	image: {
		resizeMode: 'contain',
		width: '85%',
		height: 65,
	},
	itemText: {
		fontSize: 12,
		textAlign: 'center',
	},
});

const subCategory = [
	{
		name: 'Food Cupboard',
	},
	{
		name: 'Beer, Wine & Spirit',
	},
	{
		name: 'Drinks',
	},
	{
		name: 'Household Supplies',
	},
];

const viewedProducts = [
	{
		name: 'Laptops',
		price: 69999,
		vat: 1799,
		itemsInStock: 45,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644898655/samples/ecommerce/vpavic_4291_20201113_0337_Edit.0_wowotl.jpg',
	},
	{
		name: 'Smartphones',
		price: 39999,
		vat: 1199,
		itemsInStock: 69,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901587/samples/ecommerce/6466005_sd_jmsclu.jpg',
	},
	{
		name: 'Undies',
		price: 999,
		vat: 29,
		itemsInStock: 129,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901753/samples/ecommerce/811UWQmHkSS._AC_UY445__rihooe.jpg',
	},
	{
		name: 'Boxers',
		price: 999,
		vat: 29,
		itemsInStock: 119,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902014/samples/ecommerce/81ImywNKf_L._AC_UX385__uvdpu5.jpg',
	},
	{
		name: 'Drinks',
		price: 4299,
		vat: 29,
		itemsInStock: 206,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644901961/samples/ecommerce/feb_art_whiskeys-768x512_gzaeya.jpg',
	},
	{
		name: 'Socks',
		price: 299,
		vat: 29,
		itemsInStock: 603,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902075/samples/ecommerce/socks-1631103779.jpg_myt5ec.jpg',
	},
	{
		name: 'Pillow',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644902158/Marriott-The-Marriott-Pillow-MAR-108-L_xlrg_vnw53j.jpg',
	},
	{
		name: 'Jacket',
		price: 2389,
		vat: 29,
		itemsInStock: 56,
		imgUrl:
			'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1646921525/Quilted_Pack_Jacket_ybtlg2_f8ygmk.jpg',
	},
];
