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

  endpoints: (builder) => ({
    getTeams: builder.query<TeamType[], void>({
      query: () => `teams`,
    }),
    createTeams: builder.mutation<TeamType, TeamType>({
      query: (newTeam) => ({
        url: `teams`,
        method: "POST",
        body: newTeam,
      }),
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamsMutation } = teamsApi;