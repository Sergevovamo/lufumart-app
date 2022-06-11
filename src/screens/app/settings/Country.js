import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Country = () => {
	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Country</Text>
			<View style={{ flexDirection: 'column', paddingTop: 30 }}>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<FontAwesome5 name="globe-africa" size={24} color="black" />
					<Text
						style={{
							fontSize: 17,
							fontWeight: '300',
							letterSpacing: 0.5,
							marginLeft: 5,
						}}
					>
						Kenya
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Country;
