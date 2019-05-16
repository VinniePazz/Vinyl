import { createReducer } from "../app/utils/createReducer";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_PURCHASE_PRODUCTS,
  EDIT_USER_PROFILE
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
      isAuth: false
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

export const getCartItems = (state, payload) => {
  return {
    ...state,
    cartDetail: payload
  };
};

export const removeCartItem = (state, payload) => {
  return {
    ...state,
    cartDetail: payload.cartDetail,
    userData: {
      ...state.userData,
      cart: payload.cart
    }
  };
};

export const onPurchase = (state, payload) => {
  return {
    ...state,
    successPurchase: payload.successPurchase,
    userData: {
      ...state.userData,
			cart: payload.cart,
			history: payload.history
    },
    cartDetail: payload.cartDetail
  };
};

export const editProfile = (state, payload) => {
  return { ...state, userData: payload.userData };
};

export default createReducer(initialState, {
  [LOGIN_USER]: login,
  [LOGOUT_USER]: logout,
  [REGISTER_USER]: register,
  [AUTH_USER]: auth,
  [ADD_TO_CART_USER]: addToCart,
  [GET_CART_ITEMS_USER]: getCartItems,
  [REMOVE_CART_ITEM_USER]: removeCartItem,
  [ON_PURCHASE_PRODUCTS]: onPurchase,
  [EDIT_USER_PROFILE]: editProfile
});
