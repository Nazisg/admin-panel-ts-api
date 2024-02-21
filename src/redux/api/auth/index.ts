import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { setToken, setUser } from "../../features/auth/AuthSlice";

interface LoginData {
  mail: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "loginApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["AuthApi"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "api/v1/auth/login",
        method: "post",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          dispatch(authApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log("loginUser err");
        }
      },
    }),
    getMe: builder.query<any, null>({
      query: () => ({ url: `users/profile` }),
      providesTags: ["AuthApi"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          console.log(setUser(data));
        } catch (err) {
          console.log("getprofile err");
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
