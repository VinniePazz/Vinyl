import axios from "axios";

import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER } from "./types";

import { USER_SERVER } from "../app/common/utils/misc";





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
		const state = getState()
		if (state.user.userData && state.user.userData.isAuth ) {
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
