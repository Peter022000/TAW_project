import orderReducer from "../reducer/orderReducer";
import { configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'
import authReducerPersisted from "../reducer/authReducerPersisted";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const config = {
    blacklist: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

const store = configureStore({
    reducer: {
        order: orderReducer,
        auth: authReducerPersisted,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(createStateSyncMiddleware(config)),
});

initMessageListener(store);

const persistor = persistStore(store);

export { store, persistor };
