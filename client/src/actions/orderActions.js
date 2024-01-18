import axios from 'axios';
import {
    CHANGE_STATUS,
    SAVE_AFTER_IS_PAYED,
    SAVE_NEW_ORDERS,
    SAVE_ORDERS_IN_COMPLETED,
    SAVE_ORDERS_IN_PREPARATION,
    SAVE_ORDERS_IN_SERVED,
} from "../types/orderActionTypes";
import {COMPLETED, NEW, PREPARATION, SERVED} from "../types/statusTypes";
import {toast} from "react-toastify";

export const getNewOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatusToday?statusType=' + NEW, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_NEW_ORDERS,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};

export const getOrdersInPreparation = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatusToday?statusType=' + PREPARATION, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_ORDERS_IN_PREPARATION,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};

export const getServedOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatusToday?statusType=' + SERVED, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_ORDERS_IN_SERVED,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};

export const getCompletedOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatusToday?statusType=' + COMPLETED, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_ORDERS_IN_COMPLETED,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};

export const changeOrderStatus = (order, status) => async (dispatch, getState) => {
    try {
        if(!order.isPayed && status === COMPLETED) {
            toast.error("Zamówienie musi być opłacone opłacone" , {position: "top-left", autoClose: 2000});
            throw "isnt payed";
        }

        let body = JSON.stringify({
            acceptedOrderDto: order,
            newStatus: status
            });

        const response = await axios.post('http://192.168.1.2:8080/order/changeOrderStatus', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: CHANGE_STATUS,
            payload: {
                data: data
            },
        });
    } catch (error) {
        console.error('Error while change status:', error);
    }
};

export const setIsPayed = (order) => async (dispatch, getState) => {
    try {
        let body = JSON.stringify(order);

        const response = await axios.post('http://192.168.1.2:8080/order/setIsPayed', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_AFTER_IS_PAYED,
            payload: {
                data: data
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};
