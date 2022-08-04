import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
// import { useToast } from 'react-native-toast-notifications';
import { logOut } from '../../store/actions/auth-actions';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import {
	Ionicons,
	MaterialIcons,
	FontAwesome,
	AntDesign,
} from '@expo/vector-icons';

export function DrawerContent(props) {
	const dispatch = useDispatch();
	let user = useSelector((state) => state.auth?.user?.current_user);
	// const toast = useToast();

	const signOut = async () => {
		await dispatch(logOut());
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.drawerContent}>
				<View style={styles.userInfoSection}>
					<View style={{ flexDirection: 'row', marginTop: 15 }}>
						<Avatar.Image
							source={{
								uri: 'https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1659300717/3052.png_860_g8brn4.png',
							}}
							size={50}
						/>
						<View style={{ marginLeft: 15, flexDirection: 'column' }}>
							<Title style={styles.title}>{user?.name}</Title>
							<Caption style={styles.caption}>{user?.email}</Caption>
						</View>
					</View>
				</View>
				<DrawerContentScrollView {...props}>
					<Drawer.Section>
						<DrawerItem
							icon={({ size }) => (
								<MaterialIcons name="home" size={size} color="black" />
							)}
							label="Home"
							active
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<MaterialIcons
									name="account-balance-wallet"
									size={size}
									color="black"
								/>
							)}
							label="Wallet"
							active
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<FontAwesome name="product-hunt" size={size} color="black" />
							)}
							label="Products"
							active
							style={styles.borderDrawerItem}
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<AntDesign name="dropbox" size={size} color="black" />
							)}
							label="Collections"
							active
							style={styles.borderDrawerItem}
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<FontAwesome name="shopping-bag" size={size} color="black" />
							)}
							label="Orders"
							active
							style={styles.borderDrawerItem}
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<MaterialIcons name="campaign" size={size} color="black" />
							)}
							label="Promotions"
							active
							style={styles.borderDrawerItem}
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<AntDesign name="linechart" size={size} color="black" />
							)}
							label="Insights"
							active
							style={styles.borderDrawerItem}
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<AntDesign name="gift" size={size} color="black" />
							)}
							label="Share & Earn"
							active
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ size }) => (
								<AntDesign name="setting" size={size} color="black" />
							)}
							label="Shop Settings"
							active
							labelStyle={{
								color: '#000000',
							}}
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
					</Drawer.Section>
				</DrawerContentScrollView>
			</View>

			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ size }) => (
						<Ionicons name="ios-exit-outline" size={size} color="black" />
					)}
					label="Sign Out"
					labelStyle={{
						color: '#000000',
					}}
					onPress={signOut}
				/>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
		paddingTop: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
