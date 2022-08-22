import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Localization from 'expo-localization';
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
} from '@expo/vector-icons';

const HelpCenter = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
				{isEnglish ? 'Help & Support' : "Support d'aide"}
			</Text>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 30,
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
					<Feather name="phone-call" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Contact Us' : 'Nous contacter'}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'column',
					paddingTop: 15,
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
					<AntDesign name="exclamationcircleo" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'About Us' : 'À propos de nous'}
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
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Ionicons name="menu-outline" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Terms & Conditions' : 'Termes et conditions'}
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
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<MaterialIcons name="privacy-tip" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Privacy Policy' : 'Politique de confidentialité'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HelpCenter;
