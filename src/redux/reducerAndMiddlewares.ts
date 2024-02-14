import { authApi } from "./api/auth";
import { employeesApi } from "./api/employees";
import { projectsApi } from "./api/projects";
import authSlice from "./features/auth/AuthSlice";
import { teamsApi } from "./api/teams";
import { rolesApi } from "./api/roles";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [teamsApi.reducerPath]: teamsApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
});

export const middleWares = [
  authApi.middleware,
  projectsApi.middleware,
  employeesApi.middleware,
  teamsApi.middleware,
  rolesApi.middleware,
];
