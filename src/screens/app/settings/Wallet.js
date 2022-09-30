import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ScrollView,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import * as Localization from 'expo-localization';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { tokenConfig } from '../../../store/actions/auth-actions';

const { width, height } = Dimensions.get('screen');

const Wallet = () => {
	let isEnglish = Localization.locale.slice(0, 2) === 'en';

	const [balance, setBalance] = useState(0);
	const [payload, setPayload] = useState(0);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		(async () => {
			await onRefresh();
		})();
	}, []);

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(`${payload?.userId}`);
		Toast.show({
			type: 'success',
			text1: isEnglish
				? `Referral ID copied to clipboard.`
				: `ID de parrainage copié dans le presse-papiers.`,
		});
	};

	const onRefresh = async () => {
		const token = await tokenConfig();

		setRefreshing(true);
		try {
			const response = await axios.get(
				`https://apis.lufumart.net/api/v1/wallet/customer-balance`,
				token
			);
			const result = await response.data;
			setBalance(result?.balance);
			setPayload(result);
			setRefreshing(false);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					tintColor="#fff"
					progressBackgroundColor="#fff"
				/>
			}
		>
			<View style={styles.innerContainer}>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Text
						style={{
							fontSize: 40,
							fontWeight: '400',
							lineHeight: 30,
							paddingTop: 40,
						}}
					>
						${balance.toFixed(2)}
					</Text>
					<Text
						style={{
							fontSize: 15,
							lineHeight: 5,
							paddingTop: 40,
							paddingLeft: 2,
							textTransform: 'uppercase',
						}}
					>
						usd
					</Text>
				</View>
				<Text style={{ paddingTop: 5, color: 'gray', textAlign: 'center' }}>
					{isEnglish ? 'Available' : 'Disponible'}
				</Text>
				<View style={styles.textContent}>
					<Text style={{ textAlign: 'center' }}>
						{isEnglish
							? `You can leave the funds in your balance and it will automatically be used when you shop online.`
							: `Vous pouvez laisser les fonds sur votre solde et ils seront automatiquement utilisé lors de vos achats en ligne.`}
					</Text>
				</View>
				<TouchableOpacity style={styles.referralID} onPress={copyToClipboard}>
					<Text>
						{isEnglish ? 'Your Referral Code' : `Votre code de parrainage`}:{' '}
						{payload?.userId}{' '}
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Wallet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fffff7',
	},
	innerContainer: {
		justifyContent: 'justify-start',
		alignItems: 'center',
		height: height * 0.7,
		width: width * 0.9,
		// backgroundColor: 'red',
	},
	textContent: {
		width: width * 0.7,
		height: height * 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	referralID: {
		marginTop: 25,
	},
});
