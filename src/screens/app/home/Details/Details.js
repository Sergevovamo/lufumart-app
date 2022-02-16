import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import ProductImage from './ProductImage';
import RecentlyViewed from '../RecentlyViewed';

const Details = () => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<ProductImage />
			<View style={styles.productDetails}>
				<TouchableOpacity style={styles.button}>
					<Text style={{ color: '#fff' }}>Official Store</Text>
				</TouchableOpacity>
				<Text style={{ marginTop: 5 }}>
					Galaxy A12 - 6.5" - 64GB ROM + 4GB RAM - Dual SIM - Black
				</Text>
				<Text style={{ marginTop: 5 }}>Brand: Samsung</Text>
				<Text style={styles.price}>KSh 16,499</Text>
				<Text style={styles.initialPrice}>KSh 19,999</Text>
				<Text style={styles.location}>
					+ shipping from KSh 96 to Dagoretti South - Ngand'o/Riruta
				</Text>
			</View>
			<View>
				<Text style={styles.promotionTitle}>PROMOTIONS</Text>
				<View style={styles.promotionInnerContainer}>
					<View style={styles.promotionDetail}>
						<MaterialCommunityIcons
							name="truck-delivery-outline"
							size={24}
							color="black"
						/>
						<Text style={styles.promotionText}>
							Free delivery in Nairobi & Mombasa on orders above KShs 1000
							(excluding large items)
						</Text>
					</View>
					<View style={[styles.promotionDetail, { marginTop: 5 }]}>
						<AntDesign name="Safety" size={24} color="black" />
						<Text style={styles.promotionText}>
							Easy and safer payments via the Lufumart App
						</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.promotionTitle}>DELIVERY & RETURNS</Text>
			</View>
			<View>
				<Text style={styles.promotionTitle}>PRODUCT DETAILS</Text>
				<View style={styles.itemInnerContainer}>
					<View>
						<View style={styles.itemHeader}>
							<Text style={styles.itemTitle}>Description</Text>
							<AntDesign name="right" size={18} color="black" />
						</View>
						<Text>Display: 6.5" PLS IPS</Text>
						<Text>Memory: 64GB Internal, 4GB RAM</Text>
						<Text>OS: Android 10</Text>
						<Text>Rear Camera: 48MP + 2MP + 2MP</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.promotionTitle}>CUSTOMERS ALSO VIEWED</Text>
			</View>
			<View>
				<Text style={styles.promotionTitle}>VERIFIED CUSTOMER FEEDBACK</Text>
			</View>
			<View>
				<Text style={styles.promotionTitle}>CUSTOMERS ALSO BOUGHT</Text>
			</View>
			<View>
				<Text style={styles.promotionTitle}>SELLER INFORMATION</Text>
				<View style={styles.sellerInnerContainer}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>Avenue Phones</Text>
						<AntDesign name="right" size={18} color="black" />
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.promotionTitle}>RECENTLY VIEWED</Text>
				<RecentlyViewed />
			</View>
		</ScrollView>
	);
};

export default Details;

const styles = StyleSheet.create({
	productDetails: {
		width: '100%',
		minHeight: 250,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	button: {
		width: '30%',
		height: 25,
		backgroundColor: '#f68b1e',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
	},
	price: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	initialPrice: {
		marginTop: 5,
		fontSize: 18,
		color: 'gray',
		textDecorationLine: 'line-through',
	},
	location: {
		marginTop: 5,
	},
	promotionTitle: {
		marginVertical: 20,
		marginHorizontal: 15,
		color: 'gray',
	},
	promotionInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	promotionDetail: {
		flexDirection: 'row',
	},
	promotionText: {
		marginHorizontal: 10,
	},
	itemInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	itemHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	sellerInnerContainer: {
		width: '100%',
		minHeight: 80,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
});
