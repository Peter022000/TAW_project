import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrders } from '../actions/orderActions';
import axios from 'axios';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

const OrderList = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.newOrders);
    const [tableNumbers, setTableNumbers] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate.replace(/\//g, '.');
    };

    const getTableNumber = async (tableNumberId) => {
        try {
            const response = await axios.get(
                'http://192.168.1.2:8080/qrCode/getValue/' + tableNumberId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setTableNumbers((prevTableNumbers) => ({
                ...prevTableNumbers,
                [tableNumberId]: response.data.qrCode,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        orders.forEach((order) => {
            let a = getTableNumber(order.tableNoId);
        });
    }, [orders]);

    useEffect(() => {
        dispatch(getNewOrders());
    }, [dispatch]);

    const toggleOpen = () => {
        setShowDetailsModal(!showDetailsModal);
    };

    const toggleClose = () => {
        if(setShowDetailsModal()) {
            setShowDetailsModal(!showDetailsModal);
        }
    };

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        toggleOpen();
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2 style={{ textAlign: 'center', margin: "10px" }}>Lista zamówień</h2>
                {orders.map((order, index) => {
                    return (
                        <div key={index + '_' + order.id} className="order-container">
                            <div className="order-details">
                                <p>Zamówienie: {order.orderDishesDto.map((item) => item.dishDto.name).join(', ')}</p>
                                <p>Data: {formatDate(order.date)}</p>
                                <p>Numer stolika: {tableNumbers[order.tableNoId]}</p>
                                <MDBBtn
                                    className="button"
                                    onClick={() => handleDetailsClick(order)}
                                >
                                    Szczegóły
                                </MDBBtn>
                            </div>
                        </div>
                    );
                })}
            </div>

            <MDBModal open={showDetailsModal} setopen={toggleOpen} onClose={toggleClose} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{selectedOrder ? selectedOrder.id : 'Modal title'}</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {selectedOrder ? (
                                <>
                                    {/* Display order details here */}
                                    <p>Order details go here...</p>
                                </>
                            ) : null}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn className="button">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default OrderList;
