import authSlice from "./features/auth/AuthSlice";
import { authApi } from "./api/auth";
import { employeesApi } from "./api/employees";
import { projectsApi } from "./api/projects";
import { teamsApi } from "./api/teams";
import { rolesApi } from "./api/roles";
import {reportsApi} from "./api/reports"
export const reducers = {
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [teamsApi.reducerPath]: teamsApi.reducer,
  [reportsApi.reducerPath]: reportsApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
};

export const middleWares = [
  authApi.middleware,
  projectsApi.middleware,
  employeesApi.middleware,
  teamsApi.middleware,
  rolesApi.middleware,
  reportsApi.middleware,
];
