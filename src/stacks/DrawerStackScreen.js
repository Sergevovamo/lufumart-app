import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from '../screens/app/DrawerContent';
const Drawer = createDrawerNavigator();

// import { SellStackScreen } from './AppScreenStack';
import AppTabStack from './AppTabStack';

export const DrawerStackScreen = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
			useLegacyImplementation={true}
		>
			<Drawer.Screen name="HomeDrawer" component={AppTabStack} />
			{/* <Drawer.Screen name="WalletDrawer" component={WalletStackScreen} />
					<Drawer.Screen
						name="TransactionsDrawer"
						component={TransactionsStackScreen}
					/>
					<Drawer.Screen name="LearnDrawer" component={LearnDrawer} />
					<Drawer.Screen name="AboutDrawer" component={AboutDrawer} /> */}
		</Drawer.Navigator>
	);
};
