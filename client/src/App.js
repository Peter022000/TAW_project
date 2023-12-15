import './App.css';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import {isExpired} from "react-jwt";
import Error from "./components/Error";
import Footer from "./components/Footer";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store/store";
import NewOrders from "./components/NewOrders";
import Login from "./components/Login";

function App() {


  return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><NavigationBar/><Outlet/><Footer/></>}>
              <Route index element={<NewOrders />} />
              <Route path="newOrders" element={<NewOrders/>} />
              <Route path="signin" element={<Login/>} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
