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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGNyb2N1c29mdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3MDc4MTE3ODQsImV4cCI6MTcwNzg5ODE4NH0.hgki5wmEiCos51uv5NjO_o304lI5sojlsJLQd-YXAqA";
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
