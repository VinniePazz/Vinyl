import { createReducer } from "../app/common/utils/createReducer";
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
} from "../actions/types";

const initialState = {};

export const bySell = (state, payload) => {
  return {
    ...state,
    bySell: payload
  };
};

export const byArrival = (state, payload) => {
  return {
    ...state,
    byArrival: payload
  };
};

export const brands = (state, payload) => {
  return {
    ...state,
    brands: payload
  };
};

export const addBrand = (state, payload) => {
  return {
    ...state,
    addBrand: payload.success,
    brands: payload.brands
  };
};

export const woods = (state, payload) => {
  return {
    ...state,
    woods: payload
  };
};

export const addWood = (state, payload) => {
  return {
    ...state,
    addWood: payload.success,
    woods: payload.woods
  };
};

export const productsToShop = (state, payload) => {
  return {
    ...state,
    toShop: payload.articles,
    toShopSize: payload.size
  };
};

export const addProduct = (state, payload) => {
  return {
    ...state,
    addProduct: payload
  };
};

export const clearProduct = (state, payload) => {
  return {
    ...state,
    addProduct: payload
  };
};

export const getProductDetail = (state, payload) => {
  return {
    ...state,
    prodDetail: payload
  };
};

export const clearProductDetail = (state, payload) => {
  return {
    ...state,
    prodDetail: payload
  };
};

export default createReducer(initialState, {
  [GET_PRODUCTS_BY_SELL]: bySell,
  [GET_PRODUCTS_BY_ARRIVAL]: byArrival,
  [GET_BRANDS]: brands,
  [GET_WOODS]: woods,
  [GET_PRODUCTS_TO_SHOP]: productsToShop,
  [ADD_PRODUCT]: addProduct,
  [CLEAR_PRODUCT]: clearProduct,
  [GET_PRODUCT_DETAIL]: getProductDetail,
  [CLEAR_PRODUCT_DETAIL]: clearProductDetail,
  [ADD_BRAND]: addBrand,
  [ADD_WOOD]: addWood
});
