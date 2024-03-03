import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface EmployeesType {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password?: string;
  mail?: string;
  status?: string;
  newStatus?: string;
  userId?: number;
  teamId?: number;
  email?: string;
  roleId?: number;
  team?: {
    id: number;
    teamName: string;
  };
  role?: {
    id: number;
    roleName: string;
  };
  projects?: {
    id: number;
    projectName: string;
  };
  oldpassword?: string;
  newPassword?: string;
  newConfirimPassword?: string;
  projectIds?: number[];
}

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesType, void>({
      query: () => ({ url: `users`, method: "GET" }),
      providesTags: ["Employees"],
    }),
    getEmployeesFilter: builder.query<EmployeesType[], string>({
      query: (query) => ({
        url: `users/filters?${query}`,
        method: "GET",
      }),
      providesTags: ["Employees"],
    }),
    getEmployeeById: builder.query<EmployeesType, number>({
      query: (employeeId) => ({ url: `users/${employeeId}`, method: "GET" }),
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation({
      query: (data: EmployeesType) => ({
        url: "users",
        method: "post",
        data,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `users/${id}`,
          method: "PUT",
          data: rest,
        };
      },
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation<string, string | undefined>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    resetEmployee: builder.mutation<EmployeesType, any>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}/reset-password`,
        method: "PUT",
        data: rest,
      }),
      invalidatesTags: ["Employees"],
    }),
    getStatusList: builder.query<[], void>({
      query: () => ({
        url: "users/status/list",
      }),
      providesTags: ["Employees"],
    }),
    updateStatus: builder.mutation<EmployeesType, any>({
      query: ({ userId, newStatus, ...rest }) => ({
        url: `users/${userId}/status?newStatus=${newStatus}`,
        method: "PUT",
        data: rest,
      }),
      invalidatesTags: ["Employees"],
    }),
    changePassword: builder.mutation<string, EmployeesType>({
      query: ({ ...rest }) => {
        return {
          url: `users/change-password`,
          method: "PUT",
          data: rest,
        };
      },
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useLazyGetEmployeesFilterQuery,
  useGetEmployeesFilterQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useResetEmployeeMutation,
  useGetStatusListQuery,
  useUpdateStatusMutation,
  useChangePasswordMutation,
} = employeesApi;
