import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authApi } from "src/services/authApi/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authSlice from "../features/auth/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
