import orderReducer from "../reducer/orderReducer";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        order: orderReducer,
    },
});


export { store };
