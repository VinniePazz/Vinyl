import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH } from './types';

export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_START
  }
}

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}