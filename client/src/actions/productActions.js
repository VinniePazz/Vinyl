import axios from "axios";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_GENRES,
  ADD_GENRE,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCTS_BY_SEARCH,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "./types";

import { PRODUCT_SERVER } from "../app/utils/misc";

export const getProductDetail = id => async dispatch => {
  const response = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`
  );
  dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
};

export const clearProductDetail = () => {
  return { type: CLEAR_PRODUCT_DETAIL, payload: "" };
};

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

  let newState = [...previousState, ...response.data.articles];
  dispatch({
    type: GET_PRODUCTS_TO_SHOP,
    payload: { articles: newState, size: response.data.size }
  });
};

export const getProductsToSearch = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/search`);
  dispatch({ type: GET_PRODUCTS_BY_SEARCH, payload: response.data });
};

export const addProduct = product => async dispatch => {
  const response = await axios.post(`${PRODUCT_SERVER}/article`, product);
  dispatch({ type: ADD_PRODUCT, payload: response.data });
  const responseToSearch = await axios.get(`${PRODUCT_SERVER}/search`);
  dispatch({ type: GET_PRODUCTS_BY_SEARCH, payload: responseToSearch.data });
  return response.data;
};

export const clearProduct = () => {
  return { type: CLEAR_PRODUCT, payload: "" };
};

////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////

export const getGenres = () => async dispatch => {
  const response = await axios.get(`${PRODUCT_SERVER}/genres`);
  dispatch({ type: GET_GENRES, payload: response.data });
};

export const addGenre = (genre, existingGenres) => async dispatch => {
  const response = await axios.post(`${PRODUCT_SERVER}/genre`, genre);
  if (!response.data.success) {
    return response.data;
  }

  let genres = [...existingGenres, response.data.genre];

  dispatch({
    type: ADD_GENRE,
    payload: { success: response.data.success, genres }
  });
  return response.data;
};
