import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Localization from 'expo-localization';
import { Feather } from '@expo/vector-icons';
import { logOut } from '../../../store/actions/auth-actions';

const Logout = () => {
	const dispatch = useDispatch();

	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const handleLogout = () => {
		dispatch(logOut());
	};
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
				{isEnglish ? 'Logout' : 'Se déconnecter'}
			</Text>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					onPress={handleLogout}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Feather name="log-out" size={24} color="gray" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 15,
						}}
					>
						{isEnglish ? 'Logout' : 'Se déconnecter'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Logout;
