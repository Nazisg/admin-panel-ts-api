import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {API_URL} from '../../../'
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/api/v1",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { mail: string; password: string }) => {
        return {
          url: "/auth/login",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
