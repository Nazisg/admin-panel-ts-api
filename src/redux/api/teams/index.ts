import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TeamType {
  id: number;
  teamName: string;
  status: string;
}

export const teamsApi = createApi({
  reducerPath: "teamsApi",
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