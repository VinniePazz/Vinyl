import axios from "axios";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "./types";

import { PRODUCT_SERVER } from "../app/common/utils/misc";

export const getProductDetail = (id) => async dispatch => {

	const response = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`
  );
  dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
}

export const clearProductDetail = () => {
  return({ type: CLEAR_PRODUCT_DETAIL, payload: "" });
}

export const getProductsBySell = () => async dispatch => {
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

export const getProductsToShop = (
  skip,
  limit,
  filters = [],
  previousState = []
) => async dispatch => {
  const data = { limit, skip, filters };
  const response = await axios.post(`${PRODUCT_SERVER}/shop`, data);
  console.log(response);
  let newState = [...previousState, ...response.data.articles];
  dispatch({
    type: GET_PRODUCTS_TO_SHOP,
    payload: { articles: newState, size: response.data.size }
  });
};

export const addProduct = product => async dispatch => {
  const response = await axios.post(`${PRODUCT_SERVER}/article`, product);
  dispatch({ type: ADD_PRODUCT, payload: response.data });
  return response.data;
};

export const clearProduct = () => {
  return { type: CLEAR_PRODUCT, payload: "" };
};

////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////

export const getBrands = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/brands`);
  dispatch({ type: GET_BRANDS, payload: response.data });
};

export const addBrand = (brand, existingBrands) => async dispatch => {
  const response = await axios.post(`${PRODUCT_SERVER}/brand`, brand);

  let brands = [...existingBrands, response.data.brand];

  dispatch({
    type: ADD_BRAND,
    payload: { success: response.data.success, brands }
  });
  return response.data;
};

export const getWoods = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/woods`);
  dispatch({ type: GET_WOODS, payload: response.data });
};

export const addWood = (wood, existingWoods) => async dispatch => {
  const response = await axios.post(`${PRODUCT_SERVER}/wood`, wood);
  let woods = [...existingWoods, response.data.wood];
  dispatch({
    type: ADD_WOOD,
    payload: { success: response.data.success, woods }
  });
  return response.data;
};
