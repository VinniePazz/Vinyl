import { createReducer } from "../app/common/utils/createReducer";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART_USER
} from "../actions/types";

const initialState = {};

export const login = (state, payload) => {
  return {
    ...state,
    loginSuccess: payload
  };
};

export const logout = state => {
  return {
    ...state,
    userData: {
      isAuthL: false
    }
  };
};

export const register = (state, payload) => {
  return {
    ...state,
    registerSuccess: payload
  };
};

export const auth = (state, payload) => {
  return {
    ...state,
    userData: payload
  };
};

export const addToCart = (state, payload) => {
  return {
    ...state,
    userData: {
      ...state.userData,
      cart: payload
    }
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: login,
  [LOGOUT_USER]: logout,
  [REGISTER_USER]: register,
  [AUTH_USER]: auth,
  [ADD_TO_CART_USER]: addToCart
});
