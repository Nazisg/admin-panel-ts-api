import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

interface TeamType {
  id: number;
  teamName: string;
  status: string;
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
    createTeams: builder.mutation<TeamType, TeamType>({
      query: (newTeam) => ({
        url: `api/teams`,
        method: "POST",
        body: newTeam,
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamsMutation } = teamsApi;
