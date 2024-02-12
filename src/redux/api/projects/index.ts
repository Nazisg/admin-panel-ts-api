import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProjectType {
  id: number;
  projectName: string;
  employees: string[];
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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc3MjYzMzksImV4cCI6MTcwNzgxMjczOX0.0ktKu0T9OohMeDQD2GBjfvuINBOS3K30Y-QssCiJPfM";
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
