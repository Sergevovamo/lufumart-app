import React from 'react';
import { View, Text } from 'react-native';
import * as Localization from 'expo-localization';

const Notifications = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'transparent',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View style={{ backgroundColor: 'white', padding: 20 }}>
				<Text>
					{isEnglish ? "You're all caught up!" : 'Vous êtes tous rattrapés !'}
				</Text>
			</View>
		</View>
	);
};

export default Notifications;
