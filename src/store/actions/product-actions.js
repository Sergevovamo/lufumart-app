import axios from 'axios';
import Toast from 'react-native-toast-message';
import { tokenConfig, auth } from './auth-actions';
import {
	PRODUCT_LOADING,
	PAGINATION_LOADING,
	PAGINATION_LIST_END,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCT_HOME_CATEGORIES,
	GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY,
	CURRENT_SUB_CATEGORY_TITLE,
	GET_CART_PRODUCTS,
	ADD_PRODUCT_TO_CART,
	REMOVE_PRODUCT_TO_CART,
	DECREASE_PRODUCT_TO_CART,
	GET_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCTS_SUB_CATEGORY,
	GET_MORE_PRODUCTS_SUB_CATEGORY,
	RESET_GET_MORE_PRODUCTS_SUB_CATEGORY,
	CALCULATE_TOTAL,
} from './types';
import { returnErrors, clearErrors } from './error-actions';

const PRODUCTS_CATEGORY_SERVER =
	'https://api-v1.lufumart.com/api/v1/product-categories';

const PRODUCTS_SUB_CATEGORY_SERVER =
	'https://api-v1.lufumart.com/api/v1/product-sub-categories/get-sub-category-by-category';

const PRODUCTS_SERVER = 'https://api-v1.lufumart.com/api/v1/products';

export const getProductCategories = () => async (dispatch) => {
	try {
		const response = await axios.get(`${PRODUCTS_CATEGORY_SERVER}`);
		const data = await response.data;

		await dispatch({
			type: PRODUCT_LOADING,
		});

		// console.log(data);
		await dispatch({
			type: GET_PRODUCT_CATEGORIES,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response.data);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching categories.`,
		});
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_PRODUCT_CATEGORIES'
			)
		);
	}
};

export const getProductHomeCategories = () => async (dispatch) => {
	try {
		const response = await axios.get(
			`${PRODUCTS_CATEGORY_SERVER}/lufumart-app`
		);
		const data = await response.data;

		await dispatch({
			type: PRODUCT_LOADING,
		});

		// console.log(data);
		await dispatch({
			type: GET_PRODUCT_HOME_CATEGORIES,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response.data);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching categories.`,
		});
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_PRODUCT_HOME_CATEGORIES'
			)
		);
	}
};

export const getProductSubCategoryByCategory =
	(categoryId) => async (dispatch) => {
		try {
			if (categoryId) {
				const response = await axios.get(
					`${PRODUCTS_SUB_CATEGORY_SERVER}?categoryId=${categoryId}`
				);
				const data = await response.data;

				await dispatch({
					type: PRODUCT_LOADING,
				});

				// console.log(data);
				await dispatch({
					type: GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY,
					payload: data,
				});
			}
		} catch (error) {
			console.log(error?.response);
			Toast.show({
				type: 'error',
				text1: 'Error! Something went wrong.',
				text2: `An error occurred while fetching sub categories by category.`,
			});
			dispatch(
				returnErrors(
					error.response.data,
					error.response.status,
					'GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY'
				)
			);
		}
	};

export const getProducts = () => async (dispatch) => {
	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/lufumart-app?limit=20`
		);
		const data = await response.data;

		// console.log(data);
		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: GET_PRODUCTS,
			payload: data?.products,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error?.response.data);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching products.`,
		});
		dispatch(
			returnErrors(
				error?.response?.data,
				error?.response?.status,
				'GET_PRODUCTS'
			)
		);
	}
};

// This function serves the screen on Category with limit 12
export const getProductsBySubCategory = (payload) => async (dispatch) => {
	const { subCategoryIds, limit } = payload;
	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/lufumart-app?${subCategoryIds}&limit=${limit}&type=array`
		);
		const data = await response.data;

		// totalProducts, page & products

		// console.log(data);
		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: GET_PRODUCTS_SUB_CATEGORY,
			payload: data?.products,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error?.response?.data);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching products by sub category.`,
		});
		dispatch(
			returnErrors(
				error?.response?.data,
				error?.response?.status,
				'GET_PRODUCTS_SUB_CATEGORY'
			)
		);
	}
};

// This function serves the Category screen with more products of sub category
export const getMoreProductsBySubCategory = (payload) => async (dispatch) => {
	// use default limit of 20
	const { subCategoryId, page } = payload;
	// console.log(page);
	try {
		if (subCategoryId) {
			const response = await axios.get(
				`${PRODUCTS_SERVER}/lufumart-app/sub-category-products?${subCategoryId}&page=${page}`
			);

			const data = await response.data;

			// totalProducts, page & products

			// console.log(data);
			await dispatch({
				type: PAGINATION_LOADING,
				payload: {
					page: page,
				},
			});
			await dispatch({
				type: GET_MORE_PRODUCTS_SUB_CATEGORY,
				payload: data?.products,
			});
			// await dispatch({
			// 	type: PAGINATION_LIST_END,
			// });
			dispatch(clearErrors());
		}
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Error on Get More Sub Categories',
			text2: `An error occurred while fetching more products by sub category.`,
		});
		dispatch(
			returnErrors(
				error?.response?.data,
				error?.response?.status,
				'GET_MORE_PRODUCTS_SUB_CATEGORY'
			)
		);
	}
};

export const resetGetMoreProductsSubCategory = () => async (dispatch) => {
	try {
		await dispatch({
			type: RESET_GET_MORE_PRODUCTS_SUB_CATEGORY,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentSubCategoryTitle = (data) => (dispatch) => {
	try {
		// dispatch current Sub Category Title
		dispatch({
			type: CURRENT_SUB_CATEGORY_TITLE,
			payload: data,
		});
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'CURRENT_SUB_CATEGORY_TITLE'
			)
		);
	}
};

export const getProduct = (productId) => async (dispatch) => {
	// console.log(productId);
	try {
		const response = await axios.get(`${PRODUCTS_SERVER}/${productId}`);
		const data = await response.data;
		// console.log(data);

		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: GET_PRODUCT,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching product.`,
		});
		dispatch(
			returnErrors(
				error?.response?.data,
				error?.response?.status,
				'GET_PRODUCT'
			)
		);
	}
};

export const getCartProducts = () => async (dispatch) => {
	const token = await tokenConfig();

	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/user-cart-products`,
			token
		);
		const data = await response.data;

		// console.log(data);
		await dispatch({
			type: PRODUCT_LOADING,
		});

		// calculateTotal(data.cartProducts, data.cartProductQuantity, dispatch);

		await dispatch({
			type: GET_CART_PRODUCTS,
			payload: data,
		});

		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while fetching cart products.`,
		});
		dispatch(
			returnErrors(
				error?.response?.data,
				error?.response?.status,
				'GET_PRODUCTS'
			)
		);
	}
};

// const calculateTotal = (cartProducts, cartProductQuantity, dispatch) => {
// 	let total = 0;

// 	cartProducts?.map((item, index) => {
// 		total += parseInt(item.price, 10) * cartProductQuantity[index]?.quantity;
// 	});

// 	const vat = total * 0.16;

// 	const data = {
// 		subTotal: total,
// 		vat,
// 		total: total + vat,
// 	};

// 	dispatch({
// 		type: CALCULATE_TOTAL,
// 		payload: data,
// 	});
// };

// add product to cart and increase product cart quantity
export const addProductToCart = (id) => async (dispatch) => {
	const token = await tokenConfig();
	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/add-product-to-cart?productId=${id}`,
			token
		);
		const data = await response.data;
		// console.log(data);

		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: ADD_PRODUCT_TO_CART,
			payload: data,
		});
		dispatch(getCartProducts());

		Toast.show({
			type: 'success',
			text1: 'Cart successfully updated.',
		});

		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `Cart unsuccessfully updated.`,
		});
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_PRODUCTS')
		);
	}
};

export const decreaseCartProductQuantity = (id) => async (dispatch) => {
	const token = await tokenConfig();
	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/decrease-cart-product-quantity?productId=${id}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: DECREASE_PRODUCT_TO_CART,
			payload: data,
		});
		dispatch(getCartProducts());
		Toast.show({
			type: 'success',
			text1: 'Cart successfully updated.',
			text2: `product quantity decreased.`,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while reducing product quantity.`,
		});
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_PRODUCTS')
		);
	}
};

export const removeProductToCart = (id) => async (dispatch) => {
	const token = await tokenConfig();
	try {
		const response = await axios.get(
			`${PRODUCTS_SERVER}/remove-product-to-cart?productId=${id}`,
			token
		);
		const data = await response.data;

		await dispatch({
			type: PRODUCT_LOADING,
		});

		await dispatch({
			type: REMOVE_PRODUCT_TO_CART,
			payload: data,
		});

		dispatch(getCartProducts());
		Toast.show({
			type: 'success',
			text1: 'Cart successfully updated.',
			text2: `Product removed from cart.`,
		});
		dispatch(clearErrors());
	} catch (error) {
		console.log(error);
		Toast.show({
			type: 'error',
			text1: 'Error! Something went wrong.',
			text2: `An error occurred while removing cart products.`,
		});
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'REMOVE_PRODUCT_TO_CART'
			)
		);
	}
};
