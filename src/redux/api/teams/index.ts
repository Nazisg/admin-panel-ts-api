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
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc3MjYzMzksImV4cCI6MTcwNzgxMjczOX0.0ktKu0T9OohMeDQD2GBjfvuINBOS3K30Y-QssCiJPfM";      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeams: builder.query<TeamType, void>({
      query: () => `teams`,
    }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
