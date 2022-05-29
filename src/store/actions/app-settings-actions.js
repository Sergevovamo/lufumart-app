import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save, getValueFor } from '../../utils/secureStore';
import { SHOW_TABBAR, HIDE_TABBAR } from './types';
import { returnErrors, clearErrors } from './error-actions';

export const showTabbar = () => async (dispatch) => {
	try {
		await dispatch({
			type: SHOW_TABBAR,
		});
	} catch (error) {
		console.log(error);
	}
};

export const hideTabbar = () => async (dispatch) => {
	try {
		await dispatch({
			type: HIDE_TABBAR,
		});
	} catch (error) {
		console.log(error);
	}
};
