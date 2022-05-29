import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Auth } from '../screens/auth';

const AuthStack = createStackNavigator();

const AuthScreenStack = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen
				options={{
					cardStyle: {
						backgroundColor: '#fffff7',
						opacity: 1,
					},
				}}
				name="Auth"
				component={Auth}
			/>
		</AuthStack.Navigator>
	);
};

export default AuthScreenStack;
