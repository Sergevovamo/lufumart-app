import { View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { Badge } from 'react-native-paper';

import {
	Ionicons,
	SimpleLineIcons,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
	Home,
	BrowseCategories,
	FeaturedDeals,
	Details,
} from '../screens/app/home';
import { Categories, ProductList } from '../screens/app/categories';
import { Feed } from '../screens/app/feed';
import { LikedItems } from '../screens/app/saved';
import { Settings } from '../screens/app/settings';
import {
	Cart,
	Checkout,
	DeliveryAddress,
	Search,
	Notifications,
} from '../screens/app/global';
import { Auth } from '../screens/auth'; // Auth Screen

import { auth } from '../store/actions/auth-actions';
import { showTabbar, hideTabbar } from '../store/actions/app-settings-actions';

const HomeStack = createStackNavigator();
const CategoriesStack = createStackNavigator();
const FeedStack = createStackNavigator();
const SavedStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const HomeStackScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	let currentUser = useSelector((state) => state.auth.isAuthenticated);

	const numberOfCartItems = useSelector(
		(state) => state.auth?.user?.current_user?.cart
	);

	const cartProducts = useSelector(
		(state) => state.products?.cartDetails?.cartProducts
	);

	useEffect(() => {
		dispatch(auth());
		// listen to cartProducts & update items in cart
	}, [cartProducts]);

	// showTabbar
	const displayTabbar = () => {
		navigation.navigate('HomeScreen');
		dispatch(showTabbar());
	};

	const removeTabbar = () => {
		navigation.navigate('HomeCartScreen');
		dispatch(hideTabbar());
	};

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="HomeScreen"
				component={Home}
				options={{
					title: 'Home',
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{currentUser ? (
								<>
									<TouchableOpacity
										onPress={() => navigation.navigate('HomeSearchScreen')}
									>
										<Fontisto
											name="search"
											size={20}
											color="black"
											style={{
												paddingHorizontal: 5,
											}}
										/>
									</TouchableOpacity>

									<TouchableOpacity onPress={removeTabbar}>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="black"
											style={{
												paddingHorizontal: 5,
											}}
										/>
									</TouchableOpacity>
									<Badge
										visible={numberOfCartItems?.length ? true : false}
										style={{
											marginBottom: 25,
											marginLeft: -15,
											marginRight: 10,
											color: '#fff',
											backgroundColor: '#f68b1e',
										}}
										size={15}
									>
										{numberOfCartItems?.length}
									</Badge>
								</>
							) : (
								<View>
									<TouchableOpacity
										onPress={() => navigation.navigate('HomeSearchScreen')}
									>
										<Fontisto
											name="search"
											size={20}
											color="black"
											style={{
												paddingHorizontal: 20,
											}}
										/>
									</TouchableOpacity>
								</View>
							)}
						</View>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeCategoriesScreen"
				component={BrowseCategories}
				options={{
					title: 'Browse categories',
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => navigation.navigate('HomeCartScreen')}
							>
								<MaterialCommunityIcons
									name="cart-outline"
									size={24}
									color="black"
									style={{ paddingHorizontal: 15 }}
								/>
							</TouchableOpacity>
							<Badge
								visible={numberOfCartItems?.length ? true : false}
								style={{
									marginBottom: 25,
									marginLeft: -15,
									marginRight: 10,
									color: '#fff',
									backgroundColor: '#f68b1e',
								}}
								size={15}
							>
								{numberOfCartItems?.length}
							</Badge>
						</View>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeFeaturedDealsScreen"
				component={FeaturedDeals}
				options={{
					title: 'Featured Deals',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeDetailsScreen"
				component={Details}
				options={{
					title: 'Details',
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{currentUser && (
								<>
									<TouchableOpacity
										onPress={() => navigation.navigate('HomeDetailCartScreen')}
									>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="black"
											style={{
												paddingHorizontal: 15,
											}}
										/>
									</TouchableOpacity>
									<Badge
										visible={numberOfCartItems?.length ? true : false}
										style={{
											marginBottom: 25,
											marginLeft: -15,
											marginRight: 10,
											color: '#fff',
											backgroundColor: '#f68b1e',
										}}
										size={15}
									>
										{numberOfCartItems?.length}
									</Badge>
								</>
							)}
						</View>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeSearchScreen"
				component={Search}
				options={{
					title: 'Search',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="HomeDetailCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('HomeDetailsScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="CheckoutScreen"
				component={Checkout}
				options={{
					title: 'Checkout',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('HomeCartScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="DeliveryAddressScreen"
				component={DeliveryAddress}
				options={{
					title: 'Delivery Address',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('CheckoutScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<HomeStack.Screen
				name="AuthStackScreen"
				component={AuthStackScreen}
				options={{
					headerShown: false,
					// cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					presentation: 'modal', // card
					cardStyle: {
						backgroundColor: '#fffff7',
						opacity: 1,
					},
				}}
			/>
		</HomeStack.Navigator>
	);
};

export const CategoriesStackScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	let currentUser = useSelector((state) => state.auth.isAuthenticated);

	const numberOfCartItems = useSelector(
		(state) => state.auth?.user?.current_user?.cart
	);

	const currentSubCategoryTitle = useSelector(
		(state) => state.products?.currentSubCategoryTitle?.name
	);

	// showTabbar
	const displayTabbar = () => {
		navigation.navigate('CategoriesScreen');
		dispatch(showTabbar());
	};

	const removeTabbar = () => {
		navigation.navigate('CategoriesCartScreen');
		dispatch(hideTabbar());
	};

	return (
		<CategoriesStack.Navigator>
			<CategoriesStack.Screen
				name="CategoriesScreen"
				component={Categories}
				options={{
					title: 'Categories',
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{currentUser && (
								<>
									<TouchableOpacity onPress={removeTabbar}>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="black"
											style={{ paddingHorizontal: 15 }}
										/>
									</TouchableOpacity>
									<Badge
										visible={numberOfCartItems?.length ? true : false}
										style={{
											marginBottom: 25,
											marginLeft: -15,
											marginRight: 10,
											color: '#fff',
											backgroundColor: '#f68b1e',
										}}
										size={15}
									>
										{numberOfCartItems?.length}
									</Badge>
								</>
							)}
						</View>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="CategoriesDetailsScreen"
				component={Details}
				options={{
					title: 'Details',
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{currentUser && (
								<>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate('CategoriesDetailCartScreen')
										}
									>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="black"
											style={{
												paddingHorizontal: 15,
											}}
										/>
									</TouchableOpacity>
									<Badge
										visible={numberOfCartItems?.length ? true : false}
										style={{
											marginBottom: 25,
											marginLeft: -15,
											marginRight: 10,
											color: '#fff',
											backgroundColor: '#f68b1e',
										}}
										size={15}
									>
										{numberOfCartItems?.length}
									</Badge>
								</>
							)}
						</View>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="CategoriesCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="CategoriesDetailCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('CategoriesDetailsScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="CheckoutScreen"
				component={Checkout}
				options={{
					title: 'Checkout',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('CategoriesCartScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="DeliveryAddressScreen"
				component={DeliveryAddress}
				options={{
					title: 'Delivery Address',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('CheckoutScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<CategoriesStack.Screen
				name="ProductListScreen"
				component={ProductList}
				options={{
					title: `${currentSubCategoryTitle}`,
					headerLeft: () => (
						<TouchableOpacity onPress={displayTabbar}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					// headerRight: () => (
					// 	<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					// 		<TouchableOpacity
					// 			onPress={() => navigation.navigate('HomeDetailCartScreen')}
					// 		>
					// 			<MaterialCommunityIcons
					// 				name="cart-outline"
					// 				size={24}
					// 				color="black"
					// 				style={{
					// 					paddingHorizontal: 15,
					// 				}}
					// 			/>
					// 		</TouchableOpacity>
					// 		<Badge
					// 			visible={numberOfCartItems?.length ? true : false}
					// 			style={{
					// 				marginBottom: 25,
					// 				marginLeft: -15,
					// 				marginRight: 10,
					// 				color: '#fff',
					// 				backgroundColor: '#f68b1e',
					// 			}}
					// 			size={15}
					// 		>
					// 			{numberOfCartItems?.length}
					// 		</Badge>
					// 	</View>
					// ),
				}}
			/>
			<CategoriesStack.Screen
				name="AuthStackScreen"
				component={AuthStackScreen}
				options={{
					headerShown: false,
					// cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					presentation: 'modal', // card
					cardStyle: {
						backgroundColor: '#fffff7',
						opacity: 1,
					},
				}}
			/>
		</CategoriesStack.Navigator>
	);
};

export const FeedStackScreen = ({ navigation }) => {
	let currentUser = useSelector((state) => state.auth.isAuthenticated);

	const numberOfCartItems = useSelector(
		(state) => state.auth?.user?.current_user?.cart
	);
	return (
		<FeedStack.Navigator>
			<FeedStack.Screen
				name="FeedScreen"
				component={Feed}
				options={{
					title: 'Feed',
					cardStyle: {
						backgroundColor: '#fffff7',
						opacity: 1,
					},
					headerShown: false,
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{currentUser ? (
								<>
									<TouchableOpacity
										onPress={() => navigation.navigate('FeedSearchScreen')}
									>
										<Fontisto
											name="search"
											size={20}
											color="black"
											style={{
												paddingHorizontal: 5,
											}}
										/>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => navigation.navigate('FeedCartScreen')}
									>
										<MaterialCommunityIcons
											name="cart-outline"
											size={24}
											color="black"
											style={{
												paddingHorizontal: 5,
											}}
										/>
									</TouchableOpacity>
									<Badge
										visible={numberOfCartItems?.length ? true : false}
										style={{
											marginBottom: 25,
											marginLeft: -15,
											marginRight: 10,
											color: '#fff',
											backgroundColor: '#f68b1e',
										}}
										size={15}
									>
										{numberOfCartItems?.length}
									</Badge>
								</>
							) : (
								<View>
									<TouchableOpacity
										onPress={() => navigation.navigate('FeedSearchScreen')}
									>
										<Fontisto
											name="search"
											size={20}
											color="black"
											style={{
												paddingHorizontal: 20,
											}}
										/>
									</TouchableOpacity>
								</View>
							)}
						</View>
					),
				}}
			/>
			<FeedStack.Screen
				name="FeedSearchScreen"
				component={Search}
				options={{
					title: 'Search',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('FeedScreen')}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<FeedStack.Screen
				name="FeedCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('FeedScreen')}>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<FeedStack.Screen
				name="CheckoutScreen"
				component={Checkout}
				options={{
					title: 'Checkout',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('FeedCartScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity>
							<Fontisto
								name="more-v-a"
								size={20}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</FeedStack.Navigator>
	);
};

export const SavedStackScreen = ({ navigation }) => {
	const numberOfCartItems = useSelector(
		(state) => state.auth?.user?.current_user?.cart
	);
	return (
		<SavedStack.Navigator>
			<SavedStack.Screen
				name="SavedScreen"
				component={LikedItems}
				options={{
					title: 'Saved & Liked Items',
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => navigation.navigate('SavedCartScreen')}
							>
								<MaterialCommunityIcons
									name="cart-outline"
									size={24}
									color="black"
									style={{ paddingHorizontal: 15 }}
								/>
							</TouchableOpacity>
							<Badge
								visible={numberOfCartItems?.length ? true : false}
								style={{
									marginBottom: 25,
									marginLeft: -15,
									marginRight: 10,
									color: '#fff',
									backgroundColor: '#f68b1e',
								}}
								size={15}
							>
								{numberOfCartItems?.length}
							</Badge>
						</View>
					),
				}}
			/>
			<SavedStack.Screen
				name="SavedCartScreen"
				component={Cart}
				options={{
					title: 'My Cart',
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('SavedScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</SavedStack.Navigator>
	);
};

export const SettingsStackScreen = ({ navigation }) => {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name="SettingsScreen"
				component={Settings}
				options={{
					title: 'Settings',
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => navigation.navigate('Notifications')}
								style={{ paddingHorizontal: 15 }}
							>
								<SimpleLineIcons name="bell" size={20} color="black" />
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<SettingsStack.Screen
				name="Notifications"
				component={Notifications}
				options={{
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('SettingsScreen')}
						>
							<Ionicons
								name="arrow-back"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</SettingsStack.Navigator>
	);
};

export const AuthStackScreen = ({ navigation }) => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name="AuthScreen"
				component={Auth}
				options={{
					title: '',
					// headerShown: false,
					headerLeft: () => (
						<TouchableOpacity
							// onPress={() => navigation.navigate('HomeAuthStackScreen')}
							onPress={() => navigation.goBack()}
						>
							<Ionicons
								name="ios-close"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					),
					cardStyle: {
						backgroundColor: '#fffff7',
						opacity: 1,
					},
				}}
			/>
		</AuthStack.Navigator>
	);
};
