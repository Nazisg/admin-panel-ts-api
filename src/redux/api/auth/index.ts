import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";
import { setToken } from "../../features/auth/AuthSlice";

interface LoginData {
  mail: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "loginApi",
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "/api/v1/auth/login",
        method: "post",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (err) {
          console.log(err);
        }
      },
      getProfile: builder.query<any, void>({
        query: () => ({ url: `users/profile` }),
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
