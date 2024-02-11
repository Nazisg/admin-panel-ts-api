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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc2NDAxOTAsImV4cCI6MTcwNzcyNjU5MH0.WnumTHpqAYQl65FMK9IsuovzKqe8r7EPdc9JDXfm_zY";
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
    createProject: builder.mutation<ProjectsApiResponce, ProjectType>({
      query: (newProject) => ({
        url: `project`,
        method: "POST",
        body: { newProject },
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
