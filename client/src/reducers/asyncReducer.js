import { createReducer } from "../app/utils/createReducer";
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH } from "../actions/types";

const initialState = false;

export const asyncActionStarted = (state, payload) => {
  return true;
};

export const asyncActionFinished = state => {
  return false;
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished
});
