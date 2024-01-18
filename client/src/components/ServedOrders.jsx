import React, {useEffect} from "react";
import OrderList from "./OrdersLists";
import {changeOrderStatus, getServedOrders} from "../actions/orderActions";
import {COMPLETED} from "../types/statusTypes";
import {useDispatch, useSelector} from "react-redux";

const ServedOrders = (props) => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.order.servedOrders);

    function completeOrder(acceptedOrder) {
        dispatch(changeOrderStatus(acceptedOrder, COMPLETED))
    }

    useEffect(() => {
        if(orders.length===0) {
            dispatch(getServedOrders());
        }
    }, [dispatch]);

    return (
        <div className="page-container">
            <h2 style={{ textAlign: 'center', margin: "10px" }}>Wydane zamówienia</h2>
            <OrderList key="servedOrders"
                       orders={orders}
                       buttonFunction={completeOrder}
                       functionName={"Zakończ"}
            />
        </div>
    );
}

export default ServedOrders;
