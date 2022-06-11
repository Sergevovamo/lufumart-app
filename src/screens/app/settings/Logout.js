import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Logout = () => {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logout</Text>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Feather name="log-out" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Logout
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Logout;
