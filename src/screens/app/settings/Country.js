import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import * as Localization from 'expo-localization';
import { FontAwesome5 } from '@expo/vector-icons';

const Country = () => {
	let userAddress = useSelector((state) => state.auth.currentUserAddress);
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<>
			<View>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
					{isEnglish ? 'Country' : 'Pays'}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingTop: 30,
					}}
				>
					<FontAwesome5 name="globe-africa" size={24} color="gray" />
					<TouchableOpacity
						style={{
							marginLeft: 15,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: '300',
								letterSpacing: 0.5,
							}}
						>
							{Localization.timezone} {`(${Localization.region})`}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<Text style={{ paddingTop: 30, fontSize: 20, fontWeight: 'bold' }}>
					{isEnglish ? 'Your preferred language' : 'Votre langue préférée'}
				</Text>
				<View
					style={{
						paddingTop: 30,
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<FontAwesome5 name="globe-africa" size={24} color="gray" />
					<TouchableOpacity
						style={{
							marginLeft: 15,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: '300',
								letterSpacing: 0.5,
							}}
						>
							{isEnglish ? 'English' : 'Français'} {`(${Localization.locale})`}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default Country;
