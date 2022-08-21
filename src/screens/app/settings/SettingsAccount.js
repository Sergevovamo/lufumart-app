import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 5 }}>
				Account
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
						Your Profile
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
						Password reset
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
							Delivery Address
						</Text>
					</View>
					<View>
						<Text style={{ marginLeft: 38, color: 'gray' }}>
							{userAddress?.name
								? userAddress?.name
								: 'Please set your delivery address'}
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
					<FontAwesome5 name="shopping-basket" size={22} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						Orders
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
