import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface RoleType {
  id: number;
  roleName: string;
}

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: APIBaseQuery,

  endpoints: (builder) => ({
    getRoles: builder.query<RoleType, void>({
      query: () => ({ url: `api/roles`, method: "GET" }),
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
