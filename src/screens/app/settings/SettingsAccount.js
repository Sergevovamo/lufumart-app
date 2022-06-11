import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
	Ionicons,
	SimpleLineIcons,
	FontAwesome5,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';

const SettingsAccount = () => {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 5 }}>
				Account
			</Text>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<SimpleLineIcons name="user" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Your Profile
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Ionicons name="location-outline" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Delivery Address
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<FontAwesome5 name="shopping-basket" size={22} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Orders
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<MaterialCommunityIcons name="shopping" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Buy Again
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
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
							marginLeft: 5,
						}}
					>
						Store Receipts
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SettingsAccount;
