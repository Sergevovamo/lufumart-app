import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save, getValueFor } from '../../utils/secureStore';
import {
	AUTH_USER,
	USER_LOADING,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	UPDATE_USER,
	CHANGE_PASSWORD,
	CURRENT_USER_ADDRESS,
	CURRENT_PUSH_TOKEN,
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
		await dispatch({
			type: USER_LOADING,
		});

		const response = await axios.get(`${USERS_URL}/profile`, token);
		const data = await response.data;
		// console.log(data);

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

// Register User
export const registerUser = (payload) => async (dispatch) => {
	const { name, email, phone, gender, password } = payload;
	// console.log(payload);

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({
			name,
			email,
			phone,
			gender,
			password,
			password_confirmation: password,
		});
		// console.log(body);
		await dispatch({
			type: USER_LOADING,
		});

		const response = await axios.post(`${USERS_URL}/signup`, body, config);

		const data = await response.data;
		await save('userToken', data.token);

		await dispatch({
			type: REGISTER_SUCCESS,
			payload: data,
		});
		dispatch(auth());
		Toast.show({
			type: 'success',
			text1: 'Account created successfully!',
			text2: `We're glad to have you on board`,
		});
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
		);
		dispatch(registerFail());
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

		await dispatch({
			type: USER_LOADING,
		});

		// Request body
		const body = JSON.stringify({ email, password });

		const response = await axios.post(`${USERS_URL}/signin`, body, config);
		// console.log(response.data);
		const data = await response.data;
		await save('userToken', data.token);

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
	}
};

export const updateUserInfo = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const { name, email, phone } = payload;

	try {
		// Request body
		const body = JSON.stringify({ name, email, phone });

		await dispatch({
			type: USER_LOADING,
		});

		const response = await axios.put(`${USERS_URL}/profile`, body, token);
		const data = await response.data;

		await dispatch({
			type: UPDATE_USER,
			payload: data,
		});
		dispatch(auth());
		Toast.show({
			type: 'success',
			text1: `Your user details are updated successfully.`,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'UPDATE_USER')
		);
	}
};

export const changePassword = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const { current_password, new_password } = payload;

	try {
		// Request body
		const body = JSON.stringify({ current_password, new_password });

		await dispatch({
			type: USER_LOADING,
		});

		const response = await axios.put(
			`${USERS_URL}/update-password`,
			body,
			token
		);
		const data = await response.data;

		await dispatch({
			type: CHANGE_PASSWORD,
			payload: data,
		});
		dispatch(auth());
		Toast.show({
			type: 'success',
			text1: `Password updated successfully.`,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CHANGE_PASSWORD'
			)
		);
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

export const currentUserAddress = (payload) => async (dispatch) => {
	try {
		dispatch({
			type: CURRENT_USER_ADDRESS,
			payload: payload,
		});
		Toast.show({
			type: 'success',
			text1: `Delivery address set successfully`,
		});
	} catch (error) {
		console.log(error);
	}
};

export const currentPushToken = (payload) => async (dispatch) => {
	const authToken = await tokenConfig();
	const { pushToken } = payload;

	try {
		// Request body
		const body = JSON.stringify({ token: pushToken });

		const response = await axios.put(
			`${USERS_URL}/expo-push-token`,
			body,
			authToken
		);
		// console.log(response.data);
		const { token } = await response.data;

		dispatch({
			type: CURRENT_PUSH_TOKEN,
			payload: token,
		});
		Toast.show({
			type: 'success',
			text1: `Notifications activated successfully`,
		});
	} catch (error) {
		// console.log(error.response.data);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'PUSH_TOKEN_FAIL'
			)
		);
	}
};
