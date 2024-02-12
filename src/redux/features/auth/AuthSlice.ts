import storage from "redux-persist/lib/storage";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export interface authType {
  id: number | null | undefined;
  access_token: string | null | undefined;
}

const initialState: authType = {
  id: null,
  access_token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.access_token = action.payload;
    },
  },
});
export const reducer = persistReducer(
  {
    key: "CRM:AUTH",
    storage,
    whitelist: ["user"],
  },
  userSlice.reducer
);
export const { setUser } = userSlice.actions;

export default reducer;
