import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      query: () => `getRoleForSuperAdmin`,
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
