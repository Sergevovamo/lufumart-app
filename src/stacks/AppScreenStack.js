import { View, TouchableOpacity } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
	Octicons,
	Feather,
	Ionicons,
	AntDesign,
	SimpleLineIcons,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';

import { Home, BrowseCategories, FeaturedDeals } from '../screens/app/home';
import { Categories } from '../screens/app/categories';
import { Feed } from '../screens/app/feed';
import { LikedItems } from '../screens/app/saved';
import { Profile } from '../screens/app/settings';
import { Cart, Checkout, Search, Notifications } from '../screens/app/global';

const HomeStack = createStackNavigator();
const CategoriesStack = createStackNavigator();
const FeedStack = createStackNavigator();
const SavedStack = createStackNavigator();
const SettingsStack = createStackNavigator();

export const HomeStackScreen = ({ navigation }) => (
	<HomeStack.Navigator>
		<HomeStack.Screen
			name="HomeScreen"
			component={Home}
			options={{
				title: 'Home',
				headerRight: () => (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() => navigation.navigate('HomeSearchScreen')}
						>
							<Fontisto name="search" size={20} color="black" />
						</TouchableOpacity>
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
					<TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
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
			name="HomeSearchScreen"
			component={Search}
			options={{
				title: 'Search bar',
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
	</HomeStack.Navigator>
);

export const CategoriesStackScreen = ({ navigation }) => (
	<CategoriesStack.Navigator>
		<CategoriesStack.Screen
			name="CategoriesScreen"
			component={Categories}
			options={{
				title: 'Categories',
				headerRight: () => (
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={() => navigation.navigate('CategoriesCartScreen')}
						>
							<MaterialCommunityIcons
								name="cart-outline"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
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
					<TouchableOpacity
						onPress={() => navigation.navigate('CategoriesScreen')}
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
	</CategoriesStack.Navigator>
);

export const FeedStackScreen = ({ navigation }) => (
	<FeedStack.Navigator>
		<FeedStack.Screen
			name="FeedScreen"
			component={Feed}
			options={{
				title: 'Feed',
				headerRight: () => (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() => navigation.navigate('FeedSearchScreen')}
						>
							<Fontisto name="search" size={20} color="black" />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate('FeedCartScreen')}
						>
							<MaterialCommunityIcons
								name="cart-outline"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					</View>
				),
			}}
		/>
		<FeedStack.Screen
			name="FeedSearchScreen"
			component={Search}
			options={{
				title: 'Search bar',
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

export const SavedStackScreen = ({ navigation }) => (
	<SavedStack.Navigator>
		<SavedStack.Screen
			name="SavedScreen"
			component={LikedItems}
			options={{
				title: 'Saved & Liked Items',
				headerRight: () => (
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity>
							<MaterialCommunityIcons
								name="cart-outline"
								size={24}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
						</TouchableOpacity>
					</View>
				),
			}}
		/>
	</SavedStack.Navigator>
);

export const SettingsStackScreen = ({ navigation }) => (
	<SettingsStack.Navigator>
		<SettingsStack.Screen
			name="SettingsScreen"
			component={Profile}
			options={{
				title: 'Settings',
				headerRight: () => (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity
							onPress={() => navigation.navigate('Notifications')}
						>
							<SimpleLineIcons name="bell" size={20} color="black" />
						</TouchableOpacity>
						<TouchableOpacity>
							<Fontisto
								name="more-v-a"
								size={20}
								color="black"
								style={{ paddingHorizontal: 15 }}
							/>
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
