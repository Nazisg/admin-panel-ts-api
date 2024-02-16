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
  tagTypes: ['AuthApi'],
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
          dispatch(authApi.endpoints.getProfile.initiate(undefined, { forceRefetch: true }))
         console.log('loginUser isledi');
        } catch (err) {
            // dispatch(messageCreated('Error fetching post!'))
          console.log('loginUser islemedi');
      }
      },
    }),
    getProfile: builder.query<any, void>({
      query: () => ({ url: `users/profile` }),
      providesTags: ['AuthApi'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
              const { data } = await queryFulfilled;
              // dispatch(myProfile({ myProfile: data }))
              // console.log('getprofile isledi');
          } catch (err) {
              //   dispatch(messageCreated('Error fetching post!'))
              // console.log('getprofile islemedi');
          }
      },
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
