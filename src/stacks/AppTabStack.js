import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

import {
	HomeStackScreen,
	CategoriesStackScreen,
	FeedStackScreen,
	SellStackScreen,
	SettingsStackScreen,
} from './AppScreenStack';

const Tab = createBottomTabNavigator();

const AppTabStack = () => {
	let user = useSelector((state) => state.auth?.user?.current_user);

	let tabBarVisible = useSelector((state) => state.appSettings.showTabbar);

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: '#fff',
				tabBarActiveBackgroundColor: '#00ab55',
				tabBarStyle: [
					{
						display: tabBarVisible ? 'flex' : 'none',
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
			{user?.role === 'Seller' && (
				<Tab.Screen
					name="Selling"
					component={SellStackScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<AntDesign
								name="tago"
								size={24}
								color={focused ? '#fff' : 'black'}
							/>
						),
					}}
				/>
			)}
			{user?.role === 'Administrator' && (
				<Tab.Screen
					name="Selling"
					component={SellStackScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<AntDesign
								name="tago"
								size={24}
								color={focused ? '#fff' : 'black'}
							/>
						),
					}}
				/>
			)}
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
