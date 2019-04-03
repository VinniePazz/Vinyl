import axios from "axios";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS
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
