import { View, Text } from 'react-native';
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Following from './Following';
import Explore from './Explore';

const Tab = createMaterialTopTabNavigator();

const Feed = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: { backgroundColor: 'transparent' },
				tabBarScrollEnabled: true,
				tabBarStyle: {
					width: '85%',
					height: '8%',
					marginTop: 5,
					borderTopLeftRadius: 5,
					borderTopRightRadius: 5,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
					justifyContent: 'center',
					alignItems: 'center',
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
								}}
							>
								Following
							</Text>
						</>
					),
				}}
				component={Following}
				name="Following"
			/>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#f68b1e' : 'gray',
									fontWeight: 'bold',
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
