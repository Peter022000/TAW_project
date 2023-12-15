import React from 'react';

const Order = ({ order }) => {

    const handleAcceptOrder = (order) => {
    };

    return (
        <div>
            <h3>Zamówienie dla stolika {order.tableNoId}</h3>
            <p>Data: {new Date().toLocaleString()}</p>
            <ul>
                {order.order.map((orderItem) => (
                    <li key={orderItem.dish.id}>
                        {orderItem.dish.name} - {orderItem.quantity} szt. - {orderItem.cost} zł
                    </li>
                ))}            </ul>
            <p>Koszt zamówienia: {order.cost} zł</p>
            <p>Metoda płatności: {order.paymentMethod}</p>
            <button onClick={() => handleAcceptOrder(order)}>Przyjmij</button>
        </div>
    );
};

export default Order;
