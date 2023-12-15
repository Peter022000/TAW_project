import React from "react";
import OrderList from "./OrdersLists";

const MovieCard = (props) => {

    return (
        <div className="page-container">
            <div className="content-wrap">
                <OrderList/>
            </div>
        </div>
    );
}

export default MovieCard;
