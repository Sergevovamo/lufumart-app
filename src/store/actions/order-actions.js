import axios from 'axios';
import Toast from 'react-native-toast-message';
import {
	PRODUCT_LOADING,
	CHECK_OUT_ORDER,
	CALCULATE_SHIPPING_COST,
} from './types';
import { tokenConfig } from './auth-actions';
import { returnErrors } from './error-actions';

const ORDER_SERVER = 'https://api-v1.lufumart.com/api/v1/orders';

export const calculateShippingFee = () => async (dispatch) => {
	const token = await tokenConfig();
	try {
		await dispatch({
			type: PRODUCT_LOADING,
		});

		const response = await axios.get(
			`${ORDER_SERVER}/calculate-shipping-cost`,
			token
		);

		const data = await response.data;

		await dispatch({
			type: CALCULATE_SHIPPING_COST,
			payload: data?.shippingFee,
		});
	} catch (error) {
		// console.log(error.response.data);
		let shippingFee = 0;
		await dispatch({
			type: CALCULATE_SHIPPING_COST,
			payload: shippingFee,
		});
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_PRODUCTS')
		);
	}
};

export const checkOutOrder = (payload) => async (dispatch) => {
	const token = await tokenConfig();
	const { paymentMethod, deliveryAddress } = payload;

	try {
		const body = JSON.stringify({
			paymentMethod,
			deliveryAddress,
		});

		await dispatch({
			type: PRODUCT_LOADING,
		});

		const response = await axios.post(`${ORDER_SERVER}/create`, body, token);
		const data = await response.data;

		await dispatch({
			type: CHECK_OUT_ORDER,
			payload: data,
		});
	} catch (error) {
		console.log(error.response);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while creating an order.`,
		});
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CHECKOUT_ORDER')
		);
	}
};
