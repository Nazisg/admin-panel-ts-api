import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

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
  baseQuery: APIBaseQuery,
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
