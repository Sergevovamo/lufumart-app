import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

const Country = () => {
	let userAddress = useSelector((state) => state.auth.currentUserAddress);

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Country</Text>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: 30,
				}}
			>
				<FontAwesome5 name="globe-africa" size={24} color="black" />
				<TouchableOpacity
					style={{
						marginLeft: 15,
					}}
				>
					{userAddress?.country?.map((item, index) => {
						return (
							<Text
								key={index}
								style={{
									fontSize: 16,
									fontWeight: '300',
									letterSpacing: 0.5,
								}}
							>
								{item.long_name}
							</Text>
						);
					})}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Country;
