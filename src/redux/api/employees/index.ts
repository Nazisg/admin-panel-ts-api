import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface EmployeesType {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  mail: string;
  status: string;
  team: {
    id: number;
    teamName: string;
  };
  role: {
    id: number;
    roleName: string;
  };
  projects: {
    id: number;
    projectName: string;
  }[];
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
    getEmployeesFilter: builder.query<EmployeesType, void>({
      query: () => ({ url: `users/filters`, method: "GET" }),
      providesTags: ["Employees"],
    }),
    getEmployeeById: builder.query<EmployeesType, number>({
      query: (employeeId) => ({ url: `users/${employeeId}`, method: "GET" }),
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation<EmployeesType, void>({
      query: (newEmployee) => ({
        url: `users`,
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation<
      EmployeesType,
      { id: number; post: FormData }
    >({
      query: ({ id, post }) => ({
        url: `users/${id}`,
        method: "PATCH",
        // method: 'PUT',
        body: post,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeesFilterQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeesApi;
