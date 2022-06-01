import React from 'react';
import {
	Platform,
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

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

import TopSellingItems from './TopSellingItems';
import RecentlyViewed from './RecentlyViewed';
import ShopCategories from './ShopCategories';
// import Laptops from './Laptops';
// import Headphones from './Headphones';
// import DataStorage from './DataStorage';
import DiscountProducts from './DiscountProducts';
import FlashSales from './FlashSales';
import FreeShippingProducts from './FreeShippingProducts';
import RecommendedSellers from './RecommendedSellers';
import RecommendedForYou from './RecommendedForYou';
import { hideTabbar } from '../../../store/actions/app-settings-actions';

const Home = ({ navigation }) => {
	const dispatch = useDispatch();

	const browseCategories = () => {
		navigation.navigate('HomeCategoriesScreen');
		dispatch(hideTabbar());
	};
	return (
		<View style={{ flex: 1, backgroundColor: '#fffff7' }}>
			<ScrollView nestedScrollEnabled={true}>
				<View style={styles.tabContainer}>
					<TouchableOpacity style={styles.tab}>
						<MaterialCommunityIcons
							name="heart-outline"
							size={24}
							color="black"
						/>
						<Text>Saved</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={browseCategories} style={styles.tab}>
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
				<Carousel data={data} />

				<View style={styles.banner}>
					<Text style={styles.textHeader}>Welcome to Lufumart</Text>
					<Text
						style={{
							color: '#fff',
							fontSize: 15,
							marginVertical: 5,
							paddingHorizontal: 12,
						}}
					>
						We've Got a Feeling You'll Love
					</Text>
					<TouchableOpacity style={styles.bannerButton}>
						<Text style={{ color: '#f68b1e' }}>Flash Sales</Text>
					</TouchableOpacity>
					<FlashSales />
				</View>

				<TouchableOpacity style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Your Recently Viewed Items
					</Text>
					<AntDesign name="right" size={24} color="#f68b1e" />
				</TouchableOpacity>
				<RecentlyViewed />

				<View style={styles.titleHeader}>
					<Text
						style={{
							fontSize: Platform.OS === 'ios' ? 25 : 22,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Up to 50% off New Balance
					</Text>
					<Text style={{ fontSize: 15, color: '#f68b1e' }}>
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
					<AntDesign name="arrowright" size={24} color="#f68b1e" />
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

				<View style={styles.banner2}>
					<Text style={styles.textHeader2}>Save on the brands you love</Text>
					<Text
						style={{
							color: '#fff',
							fontSize: 15,
							marginVertical: 5,
							paddingHorizontal: 18,
						}}
					>
						Up to 40% off Certified Refurbished
					</Text>
					<TouchableOpacity style={styles.bannerButton2}>
						<Text style={{ color: '#00ab55' }}>Spend smart</Text>
					</TouchableOpacity>
					<FlashSales />
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
						Shop Categories
					</Text>
				</View>
				<ShopCategories />

				<TouchableOpacity style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Get Kitchen Ware with up to 50% off today
					</Text>
					<AntDesign name="arrowright" size={24} color="#f68b1e" />
				</TouchableOpacity>
				<FreeShippingProducts />

				<View style={styles.titleHeader}>
					<Text
						style={{
							fontSize: Platform.OS === 'ios' ? 25 : 22,
							color: '#000000',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Blanket & Throws
					</Text>
					<Text style={{ fontSize: 15, color: '#000000' }}>
						Recommended for you
					</Text>
					<TouchableOpacity style={styles.titleButton}>
						<Text style={{ color: '#fff' }}>Shop now</Text>
					</TouchableOpacity>
				</View>
				<RecommendedForYou />

				<View style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#000000',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						Recommended Sellers
					</Text>
				</View>
				<RecommendedSellers />
			</ScrollView>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	tabContainer: {
		marginHorizontal: 18,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tab: {
		width: Platform.OS === 'ios' ? '30%' : '35%',
		marginLeft: 5,
		marginVertical: 5,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f3f7ff',
		borderRadius: 5,
	},
	banner: {
		marginVertical: 10,
		height: 260,
		backgroundColor: '#f68b1e',
	},
	textHeader: {
		fontSize: Platform.OS === 'ios' ? 30 : 25,
		marginTop: 20,
		paddingHorizontal: 12,
		color: '#fff',
		fontWeight: 'bold',
	},
	bannerButton: {
		marginTop: 10,
		marginHorizontal: 12,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
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
		borderRadius: 50,
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
		fontSize: Platform.OS === 'ios' ? 30 : 25,
		marginTop: 5,
		paddingHorizontal: 18,
		color: '#fff',
		fontWeight: 'bold',
	},
	bannerButton2: {
		marginTop: 20,
		marginHorizontal: 12,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#fff',
		width: Platform.OS === 'ios' ? '30%' : '35%',
	},
});

const data = [
	{
		title: 'Headphones',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1644843143/samples/ecommerce/4873_vv32wo.jpg',
		description: 'Listen to your top mixes',
		id: 1,
	},
	{
		title: 'Laptop Bag',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394323/samples/ecommerce/leather-bag-gray.jpg',
		description: 'Your laptop backpack bag',
		id: 3,
	},
	{
		title: 'Watch',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
		description: 'Keep track of your time all day long',
		id: 3,
	},
];
