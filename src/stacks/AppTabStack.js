import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import {
	MaterialIcons,
	MaterialCommunityIcons,
	SimpleLineIcons,
	Octicons,
	Feather,
	AntDesign,
} from '@expo/vector-icons';

import {
	HomeStackScreen,
	CategoriesStackScreen,
	FeedStackScreen,
	SavedStackScreen,
	SettingsStackScreen,
} from './AppScreenStack';

const Tab = createBottomTabNavigator();

const AppTabStack = () => {
	let showTabbar = useSelector((state) => state.appSettings.showTabbar);

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: '#fff',
				tabBarActiveBackgroundColor: '#00ab55',
				tabBarStyle: [
					{
						display: showTabbar ? 'flex' : 'none',
					},
					null,
				],
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeStackScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="home"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Categories"
				component={CategoriesStackScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="category"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Feed"
				component={FeedStackScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="rss-feed"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				}}
			/>
			{/* <Tab.Screen
				name="Saved"
				component={SavedStackScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name="heart-outline"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				}}
			/> */}
			<Tab.Screen
				name="Settings"
				component={SettingsStackScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<SimpleLineIcons
							name="settings"
							size={24}
							color={focused ? '#fff' : 'black'}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppTabStack;
