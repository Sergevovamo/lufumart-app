import React, { useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';
import SettingsAccount from './SettingsAccount';
import Country from './Country';
import SettingsSecurity from './SettingsSecurity';
import HelpCenter from './HelpCenter';
import Logout from './Logout';

const Settings = () => {
	const navigation = useNavigation();
	let authUser = useSelector((state) => state.auth.isAuthenticated);

	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => `${item}-${index}`}
			style={{ flexGrow: 0 }}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{ padding: 5 }}
			showsVerticalScrollIndicator={false}
			renderItem={({ item: data }) => (
				<NativeBaseProvider>
					<TextInputAvoidingView>
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
											onPress={() => navigation.navigate('AuthStackScreen')}
										>
											<Text style={{ color: '#fff', fontSize: 15 }}>
												Login or Register
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
					</TextInputAvoidingView>
				</NativeBaseProvider>
			)}
		/>
	);
};

export default Settings;

function SearchBar() {
	return (
		<VStack my="4" space={5} w="100%" maxW="300px">
			<VStack w="100%" space={5} alignSelf="center">
				<Heading fontSize="lg">Material</Heading>
				<Input
					placeholder="Search People & Places"
					width="100%"
					borderRadius="4"
					py="3"
					px="1"
					fontSize="14"
					InputLeftElement={
						<Icon
							m="2"
							ml="3"
							size="6"
							color="gray.400"
							as={<MaterialIcons name="search" />}
						/>
					}
					InputRightElement={
						<Icon
							m="2"
							mr="3"
							size="6"
							color="gray.400"
							as={<MaterialIcons name="mic" />}
						/>
					}
				/>
			</VStack>
		</VStack>
	);
}

const data = [
	{
		name: 'Dummy Data Settings',
	},
];
