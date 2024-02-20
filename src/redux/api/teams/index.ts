import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface TeamType {
  id: number;
  teamName: string;
  status: string;
}

interface TeamPostData {
  teamName: string;
}

export const teamsApi = createApi({
  reducerPath: "teamsApi",
  baseQuery: APIBaseQuery,
  tagTypes: ["Teams"],
  endpoints: (builder) => ({
    getTeams: builder.query<TeamType[], void>({
      query: () => ({ url: `api/teams`, method: "GET" }),
      providesTags: ["Teams"],
    }),
    createTeams: builder.mutation({
      query: (data: TeamPostData) => ({
        url: "api/teams",
        method: "post",
        data,
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamsMutation } = teamsApi;
