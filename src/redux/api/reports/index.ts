import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface ReportType {
  reportText?: string;
  projectId?: number;
  firstName?: string;
  lastName?: string;
  project?: {
    projectName?: string;
  };
  localDateTime?: string | any;
  // content?:[]
}

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    getReportsAdmin: builder.query<ReportType, void>({
      query: () => ({ url: `api/report/admin/filtir`, method: "GET" }),
      providesTags: ["Reports"],
    }),
    getReportsUser: builder.query<ReportType, void>({
      query: () => ({ url: `api/report/user/reports`, method: "GET" }),
      providesTags: ["Reports"],
    }),
    getReportsExport: builder.query<ReportType, void>({
      query: () => ({ url: `api/report/export-excel`, method: "GET" }),
      providesTags: ["Reports"],
    }),
    getReportById: builder.query<ReportType, number>({
      query: (id) => ({ url: `api/report/${id}`, method: "GET" }),
      providesTags: ["Reports"],
    }),
    createReport: builder.mutation({
      query: (data: ReportType) => ({
        url: "api/report/reports",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Reports"],
    }),
    updateReport: builder.mutation({
      query: ({ id, ...rest }) => {
        console.log(id, ...rest )
        return {
          url: `api/report/${id}`,
          method: "PUT",
          data: rest,
        };
      },
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetReportByIdQuery,
  useGetReportsAdminQuery,
  useGetReportsExportQuery,
  useGetReportsUserQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
} = reportsApi;
