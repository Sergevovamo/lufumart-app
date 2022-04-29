import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

import {
	MaterialIcons,
	MaterialCommunityIcons,
	SimpleLineIcons,
	Ionicons,
	Octicons,
	Feather,
	AntDesign,
} from '@expo/vector-icons';

import Carousel from '../../../components/Carousel';

// import TopSellingItems from './TopSellingItems';
import RecentlyViewed from './RecentlyViewed';
// import Laptops from './Laptops';
// import Headphones from './Headphones';
// import DataStorage from './DataStorage';
import DiscountProducts from './DiscountProducts';
import FlashSales from './FlashSales';
import FreeShippingProducts from './FreeShippingProducts';
import RecommendedSellers from './RecommendedSellers';

const Home = ({ navigation }) => {
	return (
		<ScrollView style={{ backgroundColor: '#fffff7' }}>
			<Carousel data={data} />

			<View style={styles.tabContainer}>
				<TouchableOpacity style={styles.tab}>
					<MaterialCommunityIcons
						name="heart-outline"
						size={24}
						color="black"
					/>
					<Text>Saved</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('HomeCategoriesScreen')}
					style={styles.tab}
				>
					<MaterialIcons name="category" size={24} color="black" />
					<Text>Categories</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('HomeFeaturedDealsScreen')}
					style={styles.tab}
				>
					<Ionicons name="flash-outline" size={24} color="black" />
					<Text>Deals</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.banner}>
				<Text style={styles.textHeader}>Welcome to Lufumart</Text>
				<Text
					style={{
						color: '#fff',
						fontSize: 16,
						marginVertical: 5,
						paddingHorizontal: 18,
					}}
				>
					Get what you ordered or your money back.
				</Text>
				<TouchableOpacity style={styles.bannerButton}>
					<Text style={{ color: '#f68b1e' }}>Here's how</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Flash Sales
				</Text>
				<TouchableOpacity>
					<Text style={{ color: '#f68b1e', fontWeight: 'bold' }}>SEE ALL</Text>
				</TouchableOpacity>
			</View>
			<FlashSales />

			<View style={styles.titleHeader}>
				<Text
					style={{
						fontSize: 25,
						color: '#f68b1e',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Up to 50% off New Balance
				</Text>
				<Text style={{ fontSize: 16, color: '#f68b1e' }}>
					Great deals direct from the brand
				</Text>
				<TouchableOpacity style={styles.titleButton}>
					<Text style={{ color: '#fff' }}>Shop now</Text>
				</TouchableOpacity>
			</View>
			<DiscountProducts />

			<TouchableOpacity style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#f68b1e',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Today's Deals - All With Free Shipping
				</Text>
				<AntDesign name="right" size={24} color="#f68b1e" />
			</TouchableOpacity>
			<FreeShippingProducts />

			{/* <View style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Top Selling Items
				</Text>
			</View>
			<TopSellingItems /> */}

			<View style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#f68b1e',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Recommended Sellers
				</Text>
			</View>
			<RecommendedSellers />

			<TouchableOpacity style={styles.titleOnlyHeader}>
				<Text
					style={{
						fontSize: 20,
						color: '#000000',
						fontWeight: 'bold',
						paddingBottom: 5,
					}}
				>
					Your Recently Viewed Items
				</Text>
				<AntDesign name="right" size={24} color="#f68b1e" />
			</TouchableOpacity>
			<RecentlyViewed />

			<View style={styles.banner2}>
				<Text style={styles.textHeader2}>
					The right parts at the right places
				</Text>
				<Text
					style={{
						color: '#fff',
						fontSize: 16,
						marginVertical: 5,
						paddingHorizontal: 18,
					}}
				>
					Get what you ordered or your money back.
				</Text>
				<TouchableOpacity style={styles.bannerButton2}>
					<Text style={{ color: '#00ab55' }}>Let's ride!</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Home;

const styles = StyleSheet.create({
	tabContainer: {
		paddingHorizontal: 18,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tab: {
		width: '30%',
		marginLeft: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f3f7ff',
		borderRadius: 5,
	},
	banner: {
		marginVertical: 10,
		height: 150,
		backgroundColor: '#f68b1e',
	},
	textHeader: {
		fontSize: 30,
		marginTop: 5,
		paddingHorizontal: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	bannerButton: {
		marginTop: 20,
		marginHorizontal: 18,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#fff',
		width: '30%',
	},
	titleHeader: {
		marginHorizontal: 18,
		paddingVertical: 5,
	},
	titleButton: {
		marginTop: 10,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#00ab55',
		width: '30%',
	},
	titleOnlyHeader: {
		marginHorizontal: 18,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	banner2: {
		marginVertical: 10,
		paddingBottom: 10,
		minHeight: 150,
		backgroundColor: '#00ab55',
	},
	textHeader2: {
		fontSize: 28,
		marginTop: 5,
		paddingHorizontal: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	bannerButton2: {
		marginTop: 20,
		marginHorizontal: 18,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#fff',
		width: '30%',
	},
});

const data = [
	{
		title: 'Anise Aroma Art Bazar',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 1,
	},
	{
		title: 'Wired Headphones',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843145/samples/ecommerce/wired_20headphones_my2zia.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 2,
	},
	{
		title: 'Noise Cancelling',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/NoiseCanceling_atzjnn.png',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Laptop Bag',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394323/samples/ecommerce/leather-bag-gray.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
	{
		title: 'Watch',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		id: 3,
	},
];
