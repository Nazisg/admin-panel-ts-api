import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { useAppSelector } from "src/redux/hooks";
import axios, { AxiosInstance } from "axios";

const axiosBase: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "http://localhost:8085" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      // Fetch the token from your Redux state
      const user = useAppSelector((state) => state.auth);

      // Include the token in the headers
      const result = await axiosBase({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer  test`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

axiosBase.interceptors.request.use(
  (config) => {
    console.log("interceptors -> request: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBase.interceptors.response.use(
  (response) => {
    console.log("interceptors -> response: ", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
