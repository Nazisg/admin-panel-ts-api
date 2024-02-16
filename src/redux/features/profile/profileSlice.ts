import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "src/redux/api/auth/index";

interface ProfileState {
  data: any; 
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getProfile.matchPending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.getProfile.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      }
    );
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;