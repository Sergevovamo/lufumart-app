import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Box, Text, Button, Center, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as Localization from 'expo-localization';

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
	const navigation = useNavigation();

	let authUser = useSelector((state) => state.auth.isAuthenticated);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const removeTabbar = () => {
		navigation.navigate('AuthStackScreen');
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
								<Text>
									{isEnglish
										? 'Login to your account or register a new one!'
										: `Connectez-vous à votre compte ou enregistrez-en un nouveau !`}
								</Text>
								<Button mt="2" colorScheme="green" onPress={removeTabbar}>
									<Text style={{ color: '#fff', fontSize: 15 }}>
										{isEnglish
											? 'Login or Register'
											: `Connexion ou Inscription`}
									</Text>
								</Button>
							</>
						)}
					</Box>

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
