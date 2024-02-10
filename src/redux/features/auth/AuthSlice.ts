import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface authType {
  id: string | null | undefined;
  access_token: string | null | undefined;
}

const initialState: authType = {
  id: null,
  access_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<authType>) => {
    state.id   = action.payload.id;
    },
    setToken: (state) => {
      state.access_token = null;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
