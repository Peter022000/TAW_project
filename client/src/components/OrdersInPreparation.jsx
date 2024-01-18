import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeOrderStatus, getOrdersInPreparation} from "../actions/orderActions";
import OrderList from "./OrdersLists";
import {SERVED} from "../types/statusTypes";

const OrdersInPreparation = (props) => {

    const dispatch = useDispatch();

    const orders = useSelector((state) => state.order.ordersInPreparations);

    function servedOrder(acceptedOrder) {
        dispatch(changeOrderStatus(acceptedOrder, SERVED))
    }

    useEffect(() => {
        if(orders.length===0) {
            dispatch(getOrdersInPreparation());
        }
    }, [dispatch]);

    return (
        <div className="page-container">
            <h2 style={{ textAlign: 'center', margin: "10px" }}>Zamówienia w przygotowaniu</h2>
            <OrderList key="ordersInPreparation"
                       orders={orders}
                       buttonFunction={servedOrder}
                       functionName={"Wydano"}
            />
        </div>
    );
}

export default OrdersInPreparation;
