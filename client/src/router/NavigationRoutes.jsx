import {BrowserRouter, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import NewOrders from "../components/NewOrders";
import OrdersInPreparation from "../components/OrdersInPreparation";
import ServedOrders from "../components/ServedOrders";
import CompletedOrders from "../components/CompletedOrders";
import Login from "../components/Login";
import Error from "../components/Error";
import React from "react";
import {useSelector} from "react-redux";
import AdminPanel from "../components/AdminPanel";
import EditMenu from "../components/EditMenu";
import EditDiscount from "../components/EditDiscount";
import Statistics from "../components/Statistics";
import EditQRCode from "../components/EditQRCode";
import EditMenuItem from "../components/EditMenuItem";
import EditMenuAddDish from "../components/EditMenuAddDish";
import ChangePassword from "../components/ChangePassword";
import EditQRCodeItem from "../components/EditQRCodeItem";
import EditQRCodeAdd from "../components/EditQRCodeAdd";

const NavigationRoutes = () => {

    const isLogged = useSelector((state) => state.auth.isLogged);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><NavigationBar/><Outlet/><Footer/></>}>
                    <Route index element={<NewOrders />} />
                    <Route path="new-orders" element={<NewOrders/>} />
                    <Route path="orders-in-preparation" element={<OrdersInPreparation/>} />
                    <Route path="served-orders" element={<ServedOrders/>} />
                    <Route path="completed-orders" element={<CompletedOrders/>} />
                    <Route path="admin-panel" element={<AdminPanel/>} />
                    <Route path="admin-panel/login" element={isLogged ? <Navigate replace to="/admin-panel"/> : <Login/>} />
                    <Route path="admin-panel/change-password" element={isLogged ? <ChangePassword/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-menu" element={isLogged ? <EditMenu/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-menu/:id" element={isLogged ? <EditMenuItem/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-menu/addDish-panel" element={isLogged ? <EditMenuAddDish/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-discount" element={isLogged ? <EditDiscount/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-qr-code" element={isLogged ? <EditQRCode/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-qr-code/:id" element={isLogged ? <EditQRCodeItem/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-qr-code/add-qr-code-panel" element={isLogged ? <EditQRCodeAdd/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/statistics" element={isLogged ? <Statistics/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default NavigationRoutes;
