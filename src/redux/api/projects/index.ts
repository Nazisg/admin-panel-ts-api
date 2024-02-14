import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProjectType {
  projectName: string;
  userIds: string[];
}

interface ProjectsApiResponse extends Array<ProjectType> {}
interface ProjectsApiResponce {
  projects: ProjectType[];
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8085/api/",
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc5MDQwMzYsImV4cCI6MTcwNzk5MDQzNn0.0VmdiLY0GTa9WwvzZKJhAo8qaHHToH3nsDB1NROvpSk";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsApiResponse, void>({
      query: () => `project`,
    }),
    getProjectsFilter: builder.query<ProjectsApiResponse, void>({
      query: () => `project/search`,
    }),
    createProject: builder.mutation<ProjectsApiResponce, ProjectType>({
      query: (newProject) => ({
        url: `project`,
        method: "POST",
        body: { newProject },
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsFilterQuery,
  useCreateProjectMutation,
} = projectsApi;
