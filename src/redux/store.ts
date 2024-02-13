import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducers as appReducers, middleWares } from "./reducerAndMiddlewares";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wishlist']
};
const persistedReducer = persistReducer(persistConfig, appReducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middleWares),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);