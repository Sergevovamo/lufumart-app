import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { MaterialIcons } from '@expo/vector-icons';

import { auth } from '../store/actions/auth-actions';

import AppTabStack from './AppTabStack';
import { DrawerStackScreen } from './DrawerStackScreen';
import AuthScreenStack from './AuthScreenStack';

const RootStack = () => {
	// const netinfo = useNetInfo();

	// const dispatch = useDispatch();
	let authUser = useSelector((state) => state.auth.isAuthenticated);

	// const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	const authUser = async () => {
	// 		await dispatch(auth());
	// 		setIsLoading(false);
	// 	};
	// 	authUser();
	// }, []);

	// if (isLoading) {
	// 	return <ActivityIndicator size="large" style={styles.loading} />;
	// }
	// if (!netinfo.isConnected) {
	// 	return (
	// 		<>
	// 			<StatusBar style="default" />
	// 			<View
	// 				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
	// 			>
	// 				<MaterialIcons name="wifi-off" size={150} color="red" />
	// 				<Text>You have no internet connection</Text>
	// 				<Button title="Try again?" />
	// 			</View>
	// 		</>
	// 	);
	// }

	return (
		<NavigationContainer>
			{/* <DrawerStackScreen /> */}
			<AppTabStack />
			{/* <AuthScreenStack /> */}
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
