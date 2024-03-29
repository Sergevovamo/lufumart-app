import {
	PRODUCT_LOADING,
	PAGINATION_LOADING,
	PAGINATION_LIST_END,
	GET_PRODUCT_CATEGORY,
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCTS_BY_CATEGORY,
	CURRENT_CATEGORY,
	CLEAR_PRODUCTS_BY_CATEGORY,
	GET_PRODUCT_HOME_CATEGORIES,
	GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY,
	CURRENT_SUB_CATEGORY_TITLE,
	DELETE_PRODUCT_CATEGORY,
	GET_PRODUCT,
	GET_PRODUCTS,
	GET_SEARCH_PRODUCTS,
	GET_MORE_PRODUCTS,
	GET_PRODUCTS_SUB_CATEGORY,
	GET_MORE_PRODUCTS_SUB_CATEGORY,
	RESET_GET_MORE_PRODUCTS_SUB_CATEGORY,
	GET_PRODUCTS_FLASH_SALE,
	GET_PRODUCTS_FREE_SHIPPING,
	GET_PRODUCTS_NEW_ARRIVALS,
	GET_CART_PRODUCTS,
	ADD_PRODUCT_TO_CART,
	REMOVE_PRODUCT_TO_CART,
	DECREASE_PRODUCT_TO_CART,
	CALCULATE_TOTAL,
} from '../actions/types';

const initialState = {
	isLoading: false,
	paginationLoading: false,
	moreLoading: false,
	isListEnd: false,
	isAuthenticated: null,
	productCategory: null,
	productCategories: null,
	productHomeCategories: null,
	productsByCategory: [],
	productSubCategoriesByCategory: null,
	product: null,
	products: [],
	searchProducts: [],
	getMoreProducts: [],
	getFlashSaleProducts: null,
	getFreeShippingProducts: null,
	getNewArrivalsProducts: null,
	getProductsBySubCategory: null,
	getMoreProductsBySubCategory: [],
	cartDetails: null,
	cartProducts: null,
	total: null,
	// Currently view products based on Product Detail or Sub Category
	currentCategory: null,
	currentSubCategoryTitle: null,
	totalSearchProducts: null,
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case PAGINATION_LOADING:
			if (action.payload.page === 1) {
				return { ...state, paginationLoading: true };
			} else {
				return { ...state, moreLoading: true };
			}
		case GET_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productCategory: action.payload,
			};
		case GET_PRODUCT_CATEGORIES:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productCategories: action.payload,
			};
		case GET_PRODUCT_HOME_CATEGORIES:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productHomeCategories: action.payload,
			};
		case GET_PRODUCTS_BY_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productsByCategory: [...state.productsByCategory, ...action.payload],
			};
		case CURRENT_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				currentCategory: action.payload,
			};
		case CLEAR_PRODUCTS_BY_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productsByCategory: [],
			};
		case GET_PRODUCT_SUB_CATEGORIES_BY_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				productSubCategoriesByCategory: action.payload,
			};
		case GET_PRODUCT:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				product: action.payload,
			};
		case GET_PRODUCTS:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				products: action.payload,
			};
		case GET_SEARCH_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				searchProducts: action.payload,
				totalSearchProducts: action.totalSearchProducts,
			};
		case GET_MORE_PRODUCTS:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getMoreProducts: [...state.getMoreProducts, ...action.payload],
			};
		case GET_PRODUCTS_FLASH_SALE:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getFlashSaleProducts: action.payload,
			};
		case GET_PRODUCTS_FREE_SHIPPING:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getFreeShippingProducts: action.payload,
			};
		case GET_PRODUCTS_NEW_ARRIVALS:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getNewArrivalsProducts: action.payload,
			};
		case GET_PRODUCTS_SUB_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				getProductsBySubCategory: action.payload,
			};
		case GET_MORE_PRODUCTS_SUB_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				paginationLoading: false,
				moreLoading: false,
				getMoreProductsBySubCategory: [
					...state.getMoreProductsBySubCategory,
					...action.payload,
				],
			};
		case RESET_GET_MORE_PRODUCTS_SUB_CATEGORY:
			return {
				...state,
				isAuthenticated: false,
				paginationLoading: false,
				moreLoading: false,
				getMoreProductsBySubCategory: [],
			};
		case CURRENT_SUB_CATEGORY_TITLE:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				currentSubCategoryTitle: action.payload,
			};
		case GET_CART_PRODUCTS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartDetails: action.payload,
			};
		case ADD_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case REMOVE_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case DECREASE_PRODUCT_TO_CART:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				cartProducts: action.payload,
			};
		case CALCULATE_TOTAL:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				total: action.payload,
			};
		case DELETE_PRODUCT_CATEGORY:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				productCategories: state.productCategories?.filter(
					(product) => product._id !== action.payload
				),
			};
		case PAGINATION_LIST_END:
			return {
				...state,
				paginationLoading: false,
				moreLoading: false,
				isListEnd: true,
			};
		default:
			return state;
	}
}
