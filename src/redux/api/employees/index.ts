import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/",
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
    getEmployees: builder.query<EmployeesType, void>({
      query: () => `users`,
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
    updateEmployee: builder.mutation<EmployeesType, void>({
      query: (updatedEmployee) => ({
        url: `users`,
        method: "PUT",
        body: { updatedEmployee },
      }),
    }),
    
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeesApi;
