import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	// Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import {
	VStack,
	Input,
	Button,
	IconButton,
	Icon,
	Text,
	NativeBaseProvider,
	Center,
	Box,
	Divider,
	Heading,
} from 'native-base';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import TextInputAvoidingView from '../../../components/KeyboardAvoidingWrapper';
import SettingsAccount from './SettingsAccount';
import SettingsSecurity from './SettingsSecurity';
import HelpCenter from './HelpCenter';

const Settings = () => {
	const currentUser = useSelector((state) => state.auth?.user?.current_user);
	// console.log(currentUser);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<NativeBaseProvider>
				<TextInputAvoidingView>
					<Center flex={1} px="2">
						<SearchBar />
					</Center>
				</TextInputAvoidingView>
			</NativeBaseProvider>
			{/* <ScrollView style={{ flex: 1 }}>
				<View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
					<View>
						<Text
							style={{
								color: '#090c0d',
								fontSize: 29,
								fontWeight: 'bold',
								paddingTop: 5,
							}}
						>
							{currentUser?.name}
						</Text>
						<Text style={{ color: '#5d616f', fontSize: 14, fontWeight: '500' }}>
							{currentUser?.email}
						</Text>
					</View>

					<View style={{ paddingTop: 10 }}>
						<SettingsAccount />
					</View>

					<View style={{ paddingTop: 15 }}>
						<SettingsSecurity />
					</View>

					<View style={{ paddingTop: 10 }}>
						<HelpCenter />
					</View>
				</View>
			</ScrollView> */}
		</SafeAreaView>
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
