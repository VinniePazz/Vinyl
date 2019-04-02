import axios from "axios";

import { LOGIN_USER, REGISTER_USER } from "./types";

import { USER_SERVER } from "../app/common/utils/misc";

export const login = user => async dispatch => {

  try {
    const response = await axios.post(`${USER_SERVER}/login`, user);

		dispatch({ type: LOGIN_USER, payload: response.data });
		return response.data;
  } catch (error) {
		console.error(error)
		// Нужно понять как правильно обработать ошибку с сервера на клиенте. Например, если данного пути нету и тд!!! Желательно, отобразить это в форме
  }
};

export const register = user => async dispatch => {
  try {
    const response = await axios.post(`${USER_SERVER}/register`, user);

		dispatch({ type: REGISTER_USER, payload: response.data });
		return response.data;
  } catch (error) {
    console.error(error);
  }
};
