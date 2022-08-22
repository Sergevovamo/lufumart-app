import React from 'react';
import { View, Text, Platform } from 'react-native';
import * as Localization from 'expo-localization';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import OpenOrders from './OpenOrders';
import ClosedOrders from './ClosedOrders';

const Tab = createMaterialTopTabNavigator();

const Orders = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
			}}
		>
			<Tab.Navigator
				screenOptions={{
					tabBarIndicatorStyle: { backgroundColor: 'transparent' },
					tabBarStyle: {
						width: Platform.OS === 'ios' ? '85%' : '90%',
						marginTop: Platform.OS === 'ios' ? 20 : 15,
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
						borderBottomLeftRadius: 5,
						borderBottomRightRadius: 5,
						marginLeft: 'auto',
						marginRight: 'auto',
						marginBottom: 10,
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
									{isEnglish ? 'Open Orders' : 'Commandes ouvertes'}
								</Text>
							</>
						),
					}}
					component={OpenOrders}
					name="OpenOrders"
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
									{isEnglish ? 'Closed Orders' : 'Commandes fermées'}
								</Text>
							</>
						),
					}}
					component={ClosedOrders}
					name="ClosedOrders"
				/>
			</Tab.Navigator>
		</View>
	);
};

export default Orders;
