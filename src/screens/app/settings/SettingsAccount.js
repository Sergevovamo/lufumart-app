import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import { hideTabbar } from '../../../store/actions/app-settings-actions';
import {
	Ionicons,
	SimpleLineIcons,
	FontAwesome5,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';

const SettingsAccount = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	let userAddress = useSelector((state) => state.auth.currentUserAddress);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const goToProfileScreen = () => {
		navigation.navigate('SettingsProfileScreen');
		dispatch(hideTabbar());
	};

	const goToChangePasswordScreen = () => {
		navigation.navigate('SettingsChangePasswordScreen');
		dispatch(hideTabbar());
	};

	const goToOrdersScreen = () => {
		navigation.navigate('SettingsOrdersScreen');
		dispatch(hideTabbar());
	};

	const goToDeliveryScreen = () => {
		navigation.navigate('SettingsDeliveryAddressScreen');
		dispatch(hideTabbar());
	};

	const goToWalletScreen = () => {
		navigation.navigate('SettingsWalletScreen');
		dispatch(hideTabbar());
	};

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 5 }}>
				{isEnglish ? 'Account' : 'Compte'}
			</Text>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 30,
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity
					onPress={goToProfileScreen}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<FontAwesome5 name="user-circle" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Your Profile' : 'Votre profil'}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 30,
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity
					onPress={goToChangePasswordScreen}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<MaterialCommunityIcons name="security" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Password reset' : 'Réinitialisation du mot de passe'}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 30,
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity onPress={goToDeliveryScreen}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Ionicons name="location-outline" size={24} color="gray" />
						<Text
							style={{
								fontSize: 17,
								fontWeight: '300',
								letterSpacing: 0.5,
								marginLeft: 15,
							}}
						>
							{isEnglish ? 'Delivery Address' : 'Adresse de livraison'}
						</Text>
					</View>
					<View>
						<Text style={{ marginLeft: 38, color: 'gray' }}>
							{userAddress?.name
								? userAddress?.name
								: isEnglish
								? 'Please set your delivery address'
								: 'Veuillez définir votre adresse de livraison'}
						</Text>
						<Text style={{ marginLeft: 38, color: 'gray' }}>
							{userAddress?.description}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity
					onPress={goToOrdersScreen}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Ionicons name="basket-outline" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Orders' : 'Ordres'}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity
					onPress={goToWalletScreen}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Ionicons name="wallet-outline" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Wallet' : 'Porte monnaie'}
					</Text>
				</TouchableOpacity>
			</View>

			{/* <View
				style={{
					flexDirection: 'column',
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomWidth: 1,
					borderBottomColor: 'gray',
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Fontisto name="shopping-sale" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						Store Receipts
					</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	);
};

export default SettingsAccount;
