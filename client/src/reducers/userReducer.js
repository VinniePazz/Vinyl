import {
	LOGIN_USER,
	REGISTER_USER
} from '../actions/types';

import { createReducer } from '../app/common/utils/createReducer';

const initialState = {};

export const loginUser = (state, payload) => {
  return {
    ...state,
    loginSucces: payload
  }
}

export const registerUser = (state, payload) => {
	console.log('register_reducer')
  return {
    ...state,
    loginSucces: payload
  }
}

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [REGISTER_USER]: registerUser,
})