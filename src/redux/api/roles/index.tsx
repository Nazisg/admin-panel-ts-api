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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc2NDAxOTAsImV4cCI6MTcwNzcyNjU5MH0.WnumTHpqAYQl65FMK9IsuovzKqe8r7EPdc9JDXfm_zY";
      if (token) {
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
