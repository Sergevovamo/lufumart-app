import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppTabStack from './AppTabStack';

const RootStack = () => {
	return (
		<NavigationContainer>
			<AppTabStack />
		</NavigationContainer>
	);
};

export default RootStack;

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
