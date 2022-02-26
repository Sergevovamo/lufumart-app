import { View, Text } from 'react-native';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppTabStack from './AppTabStack';
import AuthScreenStack from './AuthScreenStack';

const RootStack = () => {
	const [authUser, setAuthUser] = useState(false);
	return (
		<NavigationContainer>
			{authUser ? <AppTabStack /> : <AuthScreenStack />}
		</NavigationContainer>
	);
};

export default RootStack;
