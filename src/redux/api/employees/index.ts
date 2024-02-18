import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface EmployeesType {
  id: number;
  firstName: string;
  lastName: string;
  fullName:string;
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
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesType, void>({
      query: () => `users`,
    }),
    getEmployeesFilter: builder.query<EmployeesType, void>({
      query: () => `users/filters`,
    }),
    getEmployeeById: builder.query<EmployeesType, number>({
      query: (employeeId) => `users/${employeeId}`,
    }),
    createEmployee: builder.mutation<EmployeesType, void>({
      query: (newEmployee) => ({
        url: `users`,
        method: "POST",
        body: { newEmployee },
      }),
    }),
    updateEmployee: builder.mutation<
      EmployeesType,
      { id: number; post: FormData }
    >({
      query: ({ id, post }) => ({
        url: `users/${id}`,
        method: "PATCH",
        credentials: "include",
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
