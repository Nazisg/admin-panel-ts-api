import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { mail: string; password: string }) => {
        return {
          url: "/users",
          method: "get",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
