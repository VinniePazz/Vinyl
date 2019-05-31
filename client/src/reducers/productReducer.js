import { createReducer } from "../app/utils/createReducer";
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

export const genres = (state, payload) => {
  return {
    ...state,
    genres: payload
  };
};

export const addGenre = (state, payload) => {
  return {
    ...state,
    addGenre: payload.success,
    genres: payload.genres
  };
};

export const productsToShop = (state, payload) => {
  return {
    ...state,
    toShop: payload.articles,
    toShopSize: payload.size
  };
};

export const productsToSearch = (state, payload) => {
  return {
    ...state,
    toSearch: payload
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
  [GET_GENRES]: genres,
  [GET_PRODUCTS_TO_SHOP]: productsToShop,
  [GET_PRODUCTS_BY_SEARCH]: productsToSearch,
  [ADD_PRODUCT]: addProduct,
  [CLEAR_PRODUCT]: clearProduct,
  [GET_PRODUCT_DETAIL]: getProductDetail,
  [CLEAR_PRODUCT_DETAIL]: clearProductDetail,
  [ADD_GENRE]: addGenre
});
