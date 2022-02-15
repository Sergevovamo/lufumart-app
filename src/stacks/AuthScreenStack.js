import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login, Signup } from '../screens/auth';

const AuthStack = createStackNavigator();

const AuthScreenStack = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Signup" component={Signup} />
		</AuthStack.Navigator>
	);
};

export default AuthScreenStack;
