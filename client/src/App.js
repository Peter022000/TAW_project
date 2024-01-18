import './App.css';
import './App.css';
import React from "react";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavigationRoutes from "./router/NavigationRoutes";
import {PersistGate} from "redux-persist/integration/react";

function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationRoutes/>
                <ToastContainer
                    autoClose={false}
                    position="top-center"/>
            </PersistGate>
        </Provider>
  );
}

export default App;
