import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  user: {
    id: number | null;
    access_token: string | null;
    refresh_token: string | null;
  };
}

const initialState: AuthState = {
  user: {
    id: null,
    access_token: null,
    refresh_token: null
  }
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
  },
});

export const reducer = persistReducer(
  {
    key: "CRM:AUTH",
    storage,
    whitelist: ["user"],
  },
  authSlice.reducer
);

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
