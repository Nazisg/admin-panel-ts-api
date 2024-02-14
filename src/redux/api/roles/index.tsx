import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RoleType {
    id: number;
    roleName: string;
  }


export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/api/roles/",
    prepareHeaders: (headers) => {
      const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc5MDQwMzYsImV4cCI6MTcwNzk5MDQzNn0.0VmdiLY0GTa9WwvzZKJhAo8qaHHToH3nsDB1NROvpSk";      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRoles: builder.query<RoleType, void>({
      query: () => `getRoleForSuperAdmin`,
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
