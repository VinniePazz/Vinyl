import { createReducer } from "../app/common/utils/createReducer";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS
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

export const woods = (state, payload) => {
  return {
    ...state,
    woods: payload
  };
};

export default createReducer(initialState, {
  [GET_PRODUCTS_BY_SELL]: bySell,
  [GET_PRODUCTS_BY_ARRIVAL]: byArrival,
  [GET_BRANDS]: brands,
  [GET_WOODS]: woods
});
