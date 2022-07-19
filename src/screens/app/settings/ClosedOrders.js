import React from 'react';
import { View, Text } from 'react-native';

const CloseOrders = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fffff7',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>You have no closed orders</Text>
		</View>
	);
};

export default CloseOrders;
