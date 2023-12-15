import {GET_ORDERS} from "../types/orderTypes";

const initialState = {
    newOrders: [],
    inProgressOrders: [],
    finishedOrders: [],
    allOrders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            console.log(action.payload.data)
            return {
                newOrders: action.payload.data,
            };
        default:
            return state;
    }
};

export default orderReducer;
