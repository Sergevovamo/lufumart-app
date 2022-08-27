import React from 'react';
import { Text, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Approved from './Approved';
import Pending from './Pending';
import Rejected from './Rejected';
import OutofStock from './OutofStock';

const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get('window');

const Products = () => {
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
					marginTop: 20,
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
									color: focused ? '#00ab55' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Approved
							</Text>
						</>
					),
				}}
				component={Approved}
				name="Approved"
			/>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#00ab55' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Pending
							</Text>
						</>
					),
				}}
				component={Pending}
				name="Pending"
			/>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#00ab55' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Rejected
							</Text>
						</>
					),
				}}
				component={Rejected}
				name="Rejected"
			/>
			<Tab.Screen
				options={{
					title: ({ color, focused }) => (
						<>
							<Text
								style={{
									color: focused ? '#00ab55' : 'gray',
									fontWeight: 'bold',
									textTransform: 'uppercase',
								}}
							>
								Out of Stock
							</Text>
						</>
					),
				}}
				component={OutofStock}
				name="OutofStock"
			/>
		</Tab.Navigator>
	);
};

export default Products;
