import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Following from './Following';
import Explore from './Explore';

const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get('window');

const Feed = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: { backgroundColor: 'transparent' },
				tabBarScrollEnabled: true,
				tabBarStyle: {
					width: width * 0.95,
					height: 60,
					borderTopLeftRadius: 50,
					borderTopRightRadius: 50,
					borderBottomLeftRadius: 50,
					borderBottomRightRadius: 50,
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 50,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginBottom: 20,
					backgroundColor: '#fff',
				},
			}}
		>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#f68b1e' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Sellers
							</Text>
						</>
					),
				}}
				component={Following}
				name="Sellers"
			/>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#f68b1e' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Explore
							</Text>
						</>
					),
				}}
				component={Explore}
				name="Explore"
			/>
		</Tab.Navigator>
	);
};

export default Feed;
