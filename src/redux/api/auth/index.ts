import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {API_URL} from '../../../'

export interface authType {
  id: number | null | undefined;
  access_token: string | null | undefined;
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/api/v1",
  }),
   endpoints: (builder) => ({
    loginUser: builder.mutation<authType, { mail: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: { id: number; access_token: string }) => {
        return { id: response.id, access_token: response.access_token };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
