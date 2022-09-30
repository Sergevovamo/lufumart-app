import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as Localization from 'expo-localization';

import { MaterialIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import {
	HomeStackScreen,
	CategoriesStackScreen,
	FeedStackScreen,
	SellStackScreen,
	SettingsStackScreen,
} from './AppScreenStack';
import { DrawerStackScreen } from './DrawerStackScreen';

const Tab = createBottomTabNavigator();

const AppTabStack = () => {
	let user = useSelector((state) => state.auth?.user?.current_user);

	let tabBarVisible = useSelector((state) => state.appSettings.showTabbar);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: '#fff',
				tabBarActiveBackgroundColor: '#00ab55',
				// tabBarStyle: [
				// 	{
				// 		display: tabBarVisible ? 'flex' : 'none',
				// 	},
				// 	null,
				// ],
			}}
		>
			<Tab.Screen
				name={isEnglish ? 'Home' : 'Maison'}
				component={HomeStackScreen}
				options={({ route }) => ({
					tabBarStyle: { display: getRouteNameHomeScreen(route) },
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="home"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				})}
			/>
			<Tab.Screen
				name={isEnglish ? 'Categories' : 'Catégories'}
				component={CategoriesStackScreen}
				options={({ route }) => ({
					tabBarStyle: { display: getRouteNameCategoryScreen(route) },
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="category"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				})}
			/>
			{user?.role === 'Seller' && (
				<Tab.Screen
					name={isEnglish ? 'Selling' : 'Vente'}
					component={DrawerStackScreen}
					options={({ route }) => ({
						tabBarStyle: { display: getRouteNameSellerScreen(route) },
						tabBarIcon: ({ focused }) => (
							<AntDesign
								name="tago"
								size={24}
								color={focused ? '#fff' : 'black'}
							/>
						),
					})}
				/>
			)}
			{user?.role === 'Administrator' && (
				<Tab.Screen
					name={isEnglish ? 'Selling' : 'Vente'}
					component={DrawerStackScreen}
					options={({ route }) => ({
						tabBarStyle: { display: getRouteNameSellerScreen(route) },
						tabBarIcon: ({ focused }) => (
							<AntDesign
								name="tago"
								size={24}
								color={focused ? '#fff' : 'black'}
							/>
						),
					})}
				/>
			)}
			<Tab.Screen
				name={isEnglish ? 'Feed' : 'Alimentation'}
				component={FeedStackScreen}
				options={({ route }) => ({
					tabBarStyle: { display: getRouteNameFeedScreen(route) },
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="rss-feed"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				})}
			/>
			<Tab.Screen
				name={isEnglish ? 'Settings' : 'Réglages'}
				component={SettingsStackScreen}
				options={({ route }) => ({
					tabBarStyle: { display: getRouteNameSettingScreen(route) },
					tabBarIcon: ({ focused }) => (
						<SimpleLineIcons
							name="settings"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				})}
			/>
		</Tab.Navigator>
	);
};

export default AppTabStack;

const getRouteNameHomeScreen = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	// console.log(routeName);
	if (
		routeName?.includes('AuthStackScreen') ||
		routeName?.includes('ImageScreen') ||
		routeName?.includes('HomeDetailsScreen') ||
		routeName?.includes('HomeExploreMoreDetailsScreen') ||
		routeName?.includes('HomeProductsByCategoryDetailsScreen') ||
		routeName?.includes('HomeSearchScreen') ||
		routeName?.includes('HomeSearchDetailsScreen') ||
		routeName?.includes('HomeCategoriesScreen') ||
		routeName?.includes('HomeProductsByCategoryScreen') ||
		routeName?.includes('ExploreMoreProducts') ||
		routeName?.includes('HomeCartScreen') ||
		routeName?.includes('HomeDetailCartScreen') ||
		routeName?.includes('CheckoutScreen') ||
		routeName?.includes('DeliveryAddressScreen')
	) {
		return 'none';
	} else {
		return 'flex';
	}
};

const getRouteNameCategoryScreen = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	// console.log(routeName);
	if (
		routeName?.includes('AuthStackScreen') ||
		routeName?.includes('ImageScreen') ||
		routeName?.includes('ProductListScreen') ||
		routeName?.includes('CategoriesDetailsScreen') ||
		routeName?.includes('CategoriesCartScreen') ||
		routeName?.includes('CategoriesDetailCartScreen') ||
		routeName?.includes('CategoriesProductListDetailsScreen') ||
		routeName?.includes('CategoriesCheckoutScreen') ||
		routeName?.includes('CategoriesDeliveryAddressScreen')
	) {
		return 'none';
	} else {
		return 'flex';
	}
};

const getRouteNameSellerScreen = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	// console.log(routeName);
	if (
		routeName?.includes('ImageScreen') ||
		routeName?.includes('CategoriesDeliveryAddressScreen')
	) {
		return 'none';
	} else {
		return 'flex';
	}
};

const getRouteNameFeedScreen = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	// console.log(routeName);
	if (
		routeName?.includes('ImageScreen') ||
		routeName?.includes('FeedExploreMoreDetailsScreen') ||
		routeName?.includes('FeedDetailCartScreen') ||
		routeName?.includes('FeedCheckoutScreen') ||
		routeName?.includes('FeedDeliveryAddressScreen')
	) {
		return 'none';
	} else {
		return 'flex';
	}
};

const getRouteNameSettingScreen = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);

	// console.log(routeName);
	if (
		routeName?.includes('AuthStackScreen') ||
		routeName?.includes('SettingsProfileScreen') ||
		routeName?.includes('SettingsChangePasswordScreen') ||
		routeName?.includes('SettingsOrdersScreen') ||
		routeName?.includes('SettingsWalletScreen') ||
		routeName?.includes('SettingsDeliveryAddressScreen')
	) {
		return 'none';
	} else {
		return 'flex';
	}
};
