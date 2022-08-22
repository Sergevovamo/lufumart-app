import React from 'react';
import { View, Text } from 'react-native';
import * as Localization from 'expo-localization';

const CloseOrders = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>
				{isEnglish
					? 'You have no closed orders.'
					: "Vous n'avez aucune commande fermée."}
			</Text>
		</View>
	);
};

export default CloseOrders;
