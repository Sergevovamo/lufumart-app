import React, { useState, useEffect, useRef } from 'react';
import {
	Platform,
	View,
	Text,
	Alert,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { openSettings } from 'expo-linking';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Localization from 'expo-localization';

import {
	MaterialIcons,
	MaterialCommunityIcons,
	SimpleLineIcons,
	Ionicons,
	Octicons,
	Feather,
	AntDesign,
} from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Carousel from '../../../components/Carousel';

import ExploreProducts from './ExploreProducts';
import RecentlyViewed from './RecentlyViewed';
import ShopCategories from './ShopCategories';
import DiscountProducts from './DiscountProducts';
import FlashSales from './FlashSales';
import NewArrivals from './NewArrivals';
import FreeShippingProducts from './FreeShippingProducts';
import RecommendedSellers from './RecommendedSellers';
import RecommendedForYou from './RecommendedForYou';
import { currentPushToken } from '../../../store/actions/auth-actions';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const VirtualizedView = (props) => {
	return (
		<FlatList
			data={[]}
			ListEmptyComponent={null}
			keyExtractor={() => 'dummy'}
			renderItem={null}
			ListHeaderComponent={() => (
				<React.Fragment>{props.children}</React.Fragment>
			)}
		/>
	);
};

const Home = ({ navigation }) => {
	const route = useRoute();
	const dispatch = useDispatch();
	const responseListener = useRef();
	const notificationListener = useRef();
	const mounted = useRef(false);

	const [notification, setNotification] = useState(false);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	useEffect(() => {
		// set a clean up flag
		mounted.current = true;

		registerForPushNotificationsAsync().then((token) => {
			if (mounted.current) {
				const payload = {
					pushToken: token,
				};
				dispatch(currentPushToken(payload));
			}
		});

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, []);

	const registerForPushNotificationsAsync = async () => {
		let token;
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				// alert('Failed to get push token for push notification!');
				Alert.alert(
					'Error',
					'Sorry, we need your permission to enable Push Notifications. Please enable it in your privacy settings.',
					[
						{
							text: 'OK',
						},
						{
							text: 'Open Settings',
							onPress: async () => openSettings(),
						},
					]
				);
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			// console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
	};

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Ready for the Big Sale!',
				body: "Only 2-Hours for the Big Deals '📬'",
				data: { data: 'Lufumart Online Store' },
			},
			trigger: { seconds: 5 },
		});
	}

	const browseCategories = () => {
		navigation.navigate('HomeCategoriesScreen');
	};

	const exploreMoreProducts = () => {
		navigation.navigate('ExploreMoreProducts');
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#fffff7' }}>
			<StatusBar style="default" />

			<VirtualizedView>
				<View style={styles.tabContainer}>
					{/* <TouchableOpacity
						onPress={async () => {
							await schedulePushNotification();
						}}
						style={styles.tab}
					>
						<MaterialCommunityIcons
							name="heart-outline"
							size={24}
							color="black"
						/>
						<Text>Saved</Text>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={browseCategories} style={styles.tab}>
						<MaterialIcons name="category" size={24} color="black" />
						<Text>{isEnglish ? 'Categories' : 'Catégories'}</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity
						onPress={() => navigation.navigate('HomeFeaturedDealsScreen')}
						style={styles.tab}
					>
						<Ionicons name="flash-outline" size={24} color="black" />
						<Text>Deals</Text>
					</TouchableOpacity> */}
				</View>
				<Carousel data={data} />

				<View style={styles.banner}>
					<Text style={styles.textHeader}>
						{isEnglish ? 'Welcome to Lufumart' : 'Bienvenue chez Lufumart'}
					</Text>
					<Text
						style={{
							color: '#fff',
							fontSize: 15,
							marginVertical: 5,
							paddingHorizontal: 12,
						}}
					>
						{isEnglish
							? "We've Got a Feeling You'll Love"
							: 'Nous avons un sentiment que vous allez adorer'}
					</Text>
					<TouchableOpacity style={styles.bannerButton}>
						<Text style={{ color: '#f68b1e' }}>
							{isEnglish ? 'Flash Sales' : 'Ventes flash'}
						</Text>
					</TouchableOpacity>
					<FlashSales />
				</View>

				{/* <TouchableOpacity style={styles.titleOnlyHeader}>
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
				<RecentlyViewed /> */}

				{/* <View style={styles.titleHeader}>
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
				</View> */}
				{/* <DiscountProducts /> */}

				<View style={styles.titleHeader}>
					<Text
						style={{
							fontSize: Platform.OS === 'ios' ? 25 : 22,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						{isEnglish ? 'New Arrivals' : 'Nouvelles Arrivées'}
					</Text>
					<Text style={{ fontSize: 15, color: '#f68b1e' }}>
						{isEnglish
							? 'Exclusive new products'
							: 'Nouveaux produits exclusifs'}
					</Text>

					{isEnglish ? (
						<TouchableOpacity style={styles.titleButton}>
							<Text style={{ color: '#fff' }}>Shop now</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.titleButtonFr}>
							<Text style={{ color: '#fff' }}>Achetez maintenant</Text>
						</TouchableOpacity>
					)}
				</View>
				<NewArrivals />

				<TouchableOpacity style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						{isEnglish ? "Today's Deals" : 'Offres du jour'}
					</Text>
					<AntDesign name="arrowright" size={24} color="#f68b1e" />
				</TouchableOpacity>
				<FreeShippingProducts />

				<View style={styles.banner2}>
					<Text style={styles.textHeader2}>
						{isEnglish
							? 'Save on the brands you love'
							: 'Économisez sur les marques que vous aimez'}
					</Text>
					<Text
						style={{
							color: '#fff',
							fontSize: 15,
							marginVertical: 5,
							paddingHorizontal: 18,
						}}
					>
						{isEnglish
							? 'Up to 40% off Certified Refurbished'
							: "Jusqu'à 40 % de réduction sur les produits certifiés remis à neuf"}
					</Text>
					{isEnglish ? (
						<TouchableOpacity style={styles.bannerButton2}>
							<Text style={{ color: '#00ab55' }}>Spend smart</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.bannerButton2Fr}>
							<Text style={{ color: '#00ab55' }}>Dépensez intelligemment</Text>
						</TouchableOpacity>
					)}

					{/* <FlashSales /> */}
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
						{isEnglish ? 'Shop Categories' : 'Catégories de la boutique'}
					</Text>
				</View>
				<ShopCategories />

				{/* <TouchableOpacity style={styles.titleOnlyHeader}>
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
				</TouchableOpacity> */}
				{/* <FreeShippingProducts /> */}

				{/* <View style={styles.titleHeader}>
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
				</View> */}
				{/* <RecommendedForYou /> */}

				<View style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#000000',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						{isEnglish ? 'Sellers' : 'Les vendeurs'}
					</Text>
				</View>
				<RecommendedSellers />

				<TouchableOpacity style={styles.titleOnlyHeader}>
					<Text
						style={{
							fontSize: 20,
							color: '#f68b1e',
							fontWeight: 'bold',
							paddingBottom: 5,
						}}
					>
						{isEnglish ? 'Explore Products' : 'Explorer les produits'}
					</Text>
					{/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text
							style={{
								paddingRight: 5,
								fontSize: 13,
								fontWeight: 'bold',
								color: '#f68b1e',
							}}
						>
							{isEnglish ? 'See More' : 'Voir plus'}
						</Text>
						<AntDesign name="arrowright" size={18} color="#f68b1e" />
					</View> */}
				</TouchableOpacity>
				<ExploreProducts />
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						paddingVertical: 50,
					}}
				>
					<TouchableOpacity
						onPress={exploreMoreProducts}
						style={{
							padding: 10,
							backgroundColor: '#f3f7ff',
							borderRadius: 50,
						}}
					>
						<AntDesign name="arrowdown" size={30} color="black" />
					</TouchableOpacity>
				</View>
			</VirtualizedView>
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
		height: Platform.OS === 'ios' ? 260 : 280,
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
		marginTop: 5,
		marginHorizontal: 12,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#fff',
		width: Platform.OS === 'ios' ? '30%' : '35%',
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
	titleButtonFr: {
		marginTop: 10,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#00ab55',
		width: Platform.OS === 'ios' ? '50%' : '60%',
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
	bannerButton2Fr: {
		marginTop: 20,
		marginHorizontal: 12,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#fff',
		width: Platform.OS === 'ios' ? '50%' : '60%',
	},
});

let isEnglish = Localization.locale.slice(0, 2) === 'en';

const data = [
	{
		title: `${isEnglish ? 'Watch' : 'Regardez'}`,
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1627394315/samples/ecommerce/analog-classic.jpg',
		description: `${
			isEnglish
				? 'Keep track of your time all day long'
				: 'Gardez une trace de votre temps tout au long de la journée'
		}`,
		id: 1,
	},
	{
		title: '',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1661154096/BRIDES-23-best-places-to-buy-bridesmaids-dresses-online-4783902-7ca9b1dad4c94f8ba53c579715891797_vxp2wk.gif',
		description: '',
		id: 2,
	},
	{
		title: '',
		url: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1661154539/FA22_Customs_StrangerThings_Drop1_DesktopMobile_v2_qamt4r.gif',
		description: '',
		id: 3,
	},
];
