import axios from "axios";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
	GET_WOODS,
	GET_PRODUCTS_TO_SHOP
} from "./types";

import { PRODUCT_SERVER } from "../app/common/utils/misc";

export const getProductsBySell = () => async dispatch => {
  //?sortBy=sold&order=desc&limit=100
  const response = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`
  );
  dispatch({ type: GET_PRODUCTS_BY_SELL, payload: response.data });
};

export const getProductsByArrival = () => async dispatch => {
  const response = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`
  );
  dispatch({ type: GET_PRODUCTS_BY_ARRIVAL, payload: response.data });
};

export const getProductsToShop = (skip, limit ,filters = [], previousState = []) => async dispatch => {
	const data = {limit, skip, filters}
  const response = await axios.post(
    `${PRODUCT_SERVER}/shop`, data
	);
	console.log(response)
	let newState = [
		...previousState,
		...response.data.articles
	];
  dispatch({ type: GET_PRODUCTS_TO_SHOP, payload: { articles: newState, size: response.data.size, } });
};



////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////

export const getBrands = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/brands`);
  dispatch({ type: GET_BRANDS, payload: response.data });
};

export const getWoods = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/woods`);
  dispatch({ type: GET_WOODS, payload: response.data });
};
