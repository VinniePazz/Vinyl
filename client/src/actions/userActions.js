import axios from "axios";

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
} from "./types";

import { USER_SERVER, PRODUCT_SERVER } from "../app/common/utils/misc";

export const register = user => async dispatch => {
  try {
    const response = await axios.post(`${USER_SERVER}/register`, user);

    dispatch({ type: REGISTER_USER, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const auth = () => async (dispatch, getState) => {
  const state = getState();
  if (state.user.userData && state.user.userData.isAuth) {
    return;
  }

  const response = await axios.get(`${USER_SERVER}/auth`);
  dispatch({ type: AUTH_USER, payload: response.data });
};

export const logout = () => async dispatch => {
  const response = await axios.get(`${USER_SERVER}/logout`);
  dispatch({ type: LOGOUT_USER, payload: response.data });
  return response.data;
};

export const login = user => async dispatch => {
  const response = await axios.post(`${USER_SERVER}/login`, user);

  dispatch({ type: LOGIN_USER, payload: response.data });
  return response.data;
  // Нужно понять как правильно обработать ошибку с сервера на клиенте. Например, если данного пути нету и тд!!! Желательно, отобразить это в форме
};

export const addToCart = _id => async dispatch => {
  const response = await axios.post(
    `${USER_SERVER}/addToCart?productId=${_id}`
  );

  dispatch({
    type: ADD_TO_CART_USER,
    payload: response.data
  });
};

export const getCartItems = (cartItems, userCart) => async dispatch => {
  const response = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`
  );

  userCart.forEach(item => {
    response.data.forEach((k, i) => {
      if (item.id === k._id) {
        response.data[i].quantity = item.quantity;
      }
    });
  });

  dispatch({
    type: GET_CART_ITEMS_USER,
    payload: response.data
  });

  return response.data;
};

export const removeCartItem = id => async dispatch => {
  const response = await axios.get(`${USER_SERVER}/removeFromCart?id=${id}`);

  response.data.cart.forEach(item => {
    response.data.cartDetail.forEach((k, i) => {
      if (item.id === k._id) {
        response.data.cartDetail[i].quantity = item.quantity;
      }
    });
  });

  dispatch({
    type: REMOVE_CART_ITEM_USER,
    payload: response.data
  });

  return response.data;
};

export const onPurchase = cardDetail => async dispatch => {
  const response = await axios.post(`${USER_SERVER}/purchase`, cardDetail);
  console.log(response);
  dispatch({
    type: ON_PURCHASE_PRODUCTS,
    payload: response.data
  });
};

export const editProfile = (dataToSubmit) => async dispatch => {
  const response = await axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
		dispatch({
			type: EDIT_USER_PROFILE,
			payload: response.data
		}) 
	
	return response.data;
}
