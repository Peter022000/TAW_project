import React, {useEffect} from "react";
import OrderList from "./OrdersLists";
import {changeOrderStatus, getNewOrders} from "../actions/orderActions";
import {PREPARATION} from "../types/statusTypes";
import {useDispatch, useSelector} from "react-redux";

const NewOrders = (props) => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.order.newOrders);

    function acceptOrder(acceptedOrder) {
        dispatch(changeOrderStatus(acceptedOrder, PREPARATION))
    }

    useEffect(() => {
        if(orders.length===0) {
            dispatch(getNewOrders());
        }
    }, [dispatch]);

    return (
        <div className="page-container">
            <h2 style={{ textAlign: 'center', margin: "10px" }}>Nowe zamówienia</h2>
            <OrderList key="newOrders"
                       orders={orders}
                       buttonFunction={acceptOrder}
                       functionName={"Przyjmij"}
            />
        </div>
    );
}

export default NewOrders;
