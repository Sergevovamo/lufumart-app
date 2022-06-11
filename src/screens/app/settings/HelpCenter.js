import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
} from '@expo/vector-icons';

const HelpCenter = () => {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Help & Support</Text>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Feather name="phone-call" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Contact Us
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
					<AntDesign name="exclamationcircleo" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						About Us
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
					<Ionicons name="menu-outline" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Terms & Conditions
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
					<MaterialIcons name="privacy-tip" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Privacy Policy
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HelpCenter;
