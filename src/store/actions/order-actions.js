import axios from 'axios';
import Toast from 'react-native-toast-message';
import { save } from '../../utils/secureStore';
import {
	ORDER_LOADING,
	GET_CUSTOMER_ORDERS,
	CHECK_OUT_ORDER,
	CALCULATE_SHIPPING_COST,
} from './types';
import { tokenConfig, auth } from './auth-actions';
import { getCartProducts } from './product-actions';
import { returnErrors } from './error-actions';

const ORDER_SERVER = 'https://api-v1.lufumart.com/api/v1/orders';

export const calculateShippingFee = () => async (dispatch) => {
	const token = await tokenConfig();
	try {
		await dispatch({
			type: ORDER_LOADING,
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
	const { paymentMethod, deliveryAddress, phone } = payload;

	try {
		const body = JSON.stringify({
			paymentMethod,
			deliveryAddress,
			phone,
		});

		await dispatch({
			type: ORDER_LOADING,
		});

		const response = await axios.post(`${ORDER_SERVER}/create`, body, token);
		const data = await response.data;
		await save('transactionMessage', data.message);

		await dispatch({
			type: CHECK_OUT_ORDER,
			payload: data,
		});
		await dispatch(getCartProducts());
		await dispatch(auth());
	} catch (error) {
		console.log(error.response.data);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'CHECKOUT_ORDER')
		);
	}
};

export const getCustomerOrders = () => async (dispatch) => {
	const token = await tokenConfig();

	try {
		await dispatch({
			type: ORDER_LOADING,
		});

		const response = await axios.get(`${ORDER_SERVER}/customer-orders`, token);
		const data = await response.data;

		await dispatch({
			type: GET_CUSTOMER_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error.response);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching customer orders.`,
		});
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_CUSTOMER_ORDERS'
			)
		);
	}
};
