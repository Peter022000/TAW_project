import axios from 'axios';
import {GET_ORDERS} from "../types/orderTypes";

export const getNewOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrders', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: GET_ORDERS,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};
