import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc4MTE3ODQsImV4cCI6MTcwNzg5ODE4NH0.hgki5wmEiCos51uv5NjO_o304lI5sojlsJLQd-YXAqA";
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
