import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface EmployeeTypes {
  firstName: string;
  id: string;
  lastName: string;
  mail: string;
  status: string;
  team: { id: string; teamName: string };
}
interface ProjectType {
  projectName: string;
  users: EmployeeTypes[];
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectType, void>({
      query: () => ({ url: `api/project`, method: "GET" }),
      providesTags: ["Projects"],
    }),
    getProjectsFilter: builder.query<ProjectType, void>({
      query: () => ({ url: `api/project/search`, method: "GET" }),
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation({
      query: (data: ProjectType) => ({
        url: "api/project",
        method: "post",
        data,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      ProjectType,
      { id: number; data: ProjectType }
    >({
      query: ({ id, data }) => ({
        url: `api/project/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsFilterQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = projectsApi;
