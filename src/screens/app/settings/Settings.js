import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import {
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Link,
	Input,
	Button,
	HStack,
	Center,
	Spinner,
	Select,
	CheckIcon,
	WarningOutlineIcon,
	NativeBaseProvider,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';
import {
	hideTabbar,
	showTabbar,
} from '../../../store/actions/app-settings-actions';
import SettingsAccount from './SettingsAccount';
import Country from './Country';
import HelpCenter from './HelpCenter';
import Logout from './Logout';

const VirtualizedView = (props) => {
	return (
		<FlatList
			data={[]}
			ListEmptyComponent={null}
			keyExtractor={() => 'dummy'}
			renderItem={null}
			ListHeaderComponent={() => (
				<React.Fragment>{props.children}</React.Fragment>
			)}
		/>
	);
};

const Settings = () => {
	const dispatch = useDispatch();
	const route = useRoute();
	const navigation = useNavigation();
	const mounted = useRef(false);

	let authUser = useSelector((state) => state.auth.isAuthenticated);
	let userAddress = useSelector((state) => state.auth.currentUserAddress);

	useEffect(() => {
		mounted.current = true;

		if (route.name === 'SettingsScreen') {
			if (mounted.current) {
				dispatch(showTabbar());
			}
		}

		return () => {
			// cancel subscription to useEffect
			mounted.current = false;
		};
	}, [route.name]);

	const removeTabbar = () => {
		navigation.navigate('AuthStackScreen');
		// dispatch(hideTabbar());
	};

	return (
		<VirtualizedView>
			<NativeBaseProvider>
				<Center w="100%">
					<Box
						style={{
							backgroundColor: '#fff',
							borderRadius: 20,
							paddingHorizontal: 20,
						}}
						safeArea
						py="8"
						w="95%"
						maxW="350"
					>
						{authUser ? (
							<SettingsAccount />
						) : (
							<>
								<Text>Login to your account or register a new one!</Text>
								<Button
									mt="2"
									colorScheme="green"
									// onPress={handleSubmit(onSubmit)}
									onPress={removeTabbar}
								>
									<Text style={{ color: '#fff', fontSize: 15 }}>
										Login or Register
									</Text>
								</Button>
							</>
						)}
					</Box>
					{userAddress?.country?.length > 0 && (
						<Box
							style={{
								marginTop: 20,
								backgroundColor: '#fff',
								borderRadius: 20,
								paddingHorizontal: 20,
							}}
							safeArea
							py="8"
							w="95%"
							maxW="350"
						>
							<Country />
						</Box>
					)}

					<Box
						style={{
							marginTop: 20,
							backgroundColor: '#fff',
							borderRadius: 20,
							paddingHorizontal: 20,
						}}
						safeArea
						py="8"
						w="95%"
						maxW="350"
					>
						<HelpCenter />
					</Box>
					{authUser && (
						<Box
							style={{
								marginTop: 20,
								backgroundColor: '#fff',
								borderRadius: 20,
								paddingHorizontal: 20,
							}}
							safeArea
							py="8"
							w="95%"
							maxW="350"
						>
							<Logout />
						</Box>
					)}
				</Center>
			</NativeBaseProvider>
		</VirtualizedView>
	);
};

export default Settings;
