import { createApi } from "@reduxjs/toolkit/query/react";
// import {API_URL} from '../../../'
import { axiosBaseQuery } from "../axiosBase";
import  {setToken } from "../../features/auth/AuthSlice"


interface LoginData {
  mail: string;
  password: string;
}
export const authApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "/api/v1/auth/login",
        method: "post",
        data: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (err) {
          console.log(err);
        }
      }

    }),
  }),
});

export const { useLoginMutation } = authApi;
