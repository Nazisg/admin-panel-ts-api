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
      query: () => ({ url: `api/project/search?size=1000`, method: "GET" }),
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query<ProjectType, number>({
      query: (id) => ({ url: `api/project/${id}`, method: "GET" }),
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
    updateProject: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `api/project/${id}`,
          method: "PUT",
          data: rest,
        }
      },
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsFilterQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectByIdQuery,
} = projectsApi;
