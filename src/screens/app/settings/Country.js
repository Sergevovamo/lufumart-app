import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import * as Localization from 'expo-localization';
import { FontAwesome5 } from '@expo/vector-icons';

const Country = () => {
	let userAddress = useSelector((state) => state.auth.currentUserAddress);

	return (
		<>
			<View>
				<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Country</Text>
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
					Your preferred language
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
							{Localization.locale.slice(0, 2) === 'en'
								? 'English'
								: 'Français'}{' '}
							{`(${Localization.locale})`}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default Country;
