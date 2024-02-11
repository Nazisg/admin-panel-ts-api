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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc2NDAxOTAsImV4cCI6MTcwNzcyNjU5MH0.WnumTHpqAYQl65FMK9IsuovzKqe8r7EPdc9JDXfm_zY";
      if (token) {
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
