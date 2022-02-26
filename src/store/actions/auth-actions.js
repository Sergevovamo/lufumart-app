import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save, getValueFor } from '../../utils/secureStore';
import {
	AUTH_USER,
	USER_LOADING,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
} from './types';
import {
	returnErrors,
	clearErrors,
	loginFail,
	authError,
} from './error-actions';

const USERS_URL = 'https://api-v1.lufumart.com/api/v1/auth';

// Setup config headers and token
export const tokenConfig = async () => {
	// Get token from secureStore
	const token = await getValueFor('userToken');

	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

export const auth = () => async (dispatch) => {
	const token = await tokenConfig();
	// console.log(token);

	try {
		const response = await axios.get(`${USERS_URL}/profile`, token);
		const data = await response.data;
		console.log(data);

		await dispatch({
			type: USER_LOADING,
		});

		await dispatch({
			type: AUTH_USER,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'AUTH_ERROR')
		);
		dispatch(authError());
	}
};

// Login User
export const loginUser = (payload) => async (dispatch) => {
	const { email, password } = payload;
	// console.log(payload);

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({ email, password });

		const response = await axios.post(`${USERS_URL}/signin`, body, config);
		// console.log(response.data);
		const data = await response.data;
		await save('userToken', data.token);

		await dispatch({
			type: USER_LOADING,
		});

		await dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
		dispatch(auth());
		Toast.show({
			type: 'success',
			text1: `You're now logged in successfully!`,
		});
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
		);
		dispatch(loginFail());
		Toast.show({
			type: 'error',
			text1: 'Invalid credentials. Please try again!',
			text2: 'Either your email address or password is incorrect.',
		});
	}
};

// Logout User
export const logOut = () => async (dispatch) => {
	const clearToken = '';
	await save('userToken', clearToken);
	Toast.show({
		type: 'success',
		text1: `You're now logged out successfully!`,
	});

	dispatch({
		type: LOGOUT_SUCCESS,
	});
};
