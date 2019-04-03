import { createReducer } from "../app/common/utils/createReducer";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL
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

export default createReducer(initialState, {
  [GET_PRODUCTS_BY_SELL]: bySell,
  [GET_PRODUCTS_BY_ARRIVAL]: byArrival
});
