import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Rejected = () => {
	const navigation = useNavigation();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#f3f7ff',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View style={{ backgroundColor: 'white', padding: 20 }}>
				<Text>
					You have no products with{' '}
					<Text style={{ color: '#00ab55', fontStyle: 'italic' }}>
						rejected
					</Text>{' '}
					status
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate('AddProductsRejectedScreen')}
				style={styles.floatButton}
			>
				<AntDesign name="plus" size={20} color="#fff" />
				<Text style={{ color: '#fff', paddingLeft: 5 }}>Add Product</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Rejected;

const styles = StyleSheet.create({
	floatButton: {
		marginTop: 5,
		marginHorizontal: 12,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: '#00ab55',
		width: Platform.OS === 'ios' ? '35%' : '40%',
		position: 'absolute',
		bottom: 15,
		right: 10,
	},
});
