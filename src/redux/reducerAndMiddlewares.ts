import { authApi } from "./api/auth";
import { employeesApi } from "./api/employees";
import { otpApi } from "./api/otp";
import { projectsApi } from "./api/projects";
import { reportsApi } from "./api/reports";
import { rolesApi } from "./api/roles";
import { teamsApi } from "./api/teams";
import authSlice from "./features/auth/AuthSlice";

export const reducers = {
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [teamsApi.reducerPath]: teamsApi.reducer,
  [reportsApi.reducerPath]: reportsApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [otpApi.reducerPath]: otpApi.reducer,
};

export const middleWares = [
  authApi.middleware,
  projectsApi.middleware,
  employeesApi.middleware,
  teamsApi.middleware,
  rolesApi.middleware,
  reportsApi.middleware,
  otpApi.middleware,
];
