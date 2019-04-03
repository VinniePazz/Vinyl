import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL
} from './types';

import { PRODUCT_SERVER } from '../app/common/utils/misc';


export const getProductsBySell = () => async (dispatch) => {
    //?sortBy=sold&order=desc&limit=100
    const response = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
		dispatch({ type: GET_PRODUCTS_BY_SELL, payload: response.data });
}

export const getProductsByArrival = () => async (dispatch) => {
    const response = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)  
		dispatch({ type: GET_PRODUCTS_BY_ARRIVAL, payload: response.data });
}