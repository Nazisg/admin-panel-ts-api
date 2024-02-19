import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}`;

export const axiosBaseQuery =
  ({
    baseURL = "",
    headers,
  }: {
    baseURL: string;
    headers: any;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    unknown
  > =>
  async ({ url, params, method, data, responseType }, { signal, getState }) => {
    try {
      const result = await axios({
        url: baseURL + url,
        method: method ? method : "GET",
        ...(params && { params: params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
        ...(data && { data: data }),
        responseType: responseType ? responseType : "json",
      });
      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseURL: baseURL,
    headers: (headers: AxiosRequestConfig["headers"] = {}, { getState }: { getState: () => any }) => {
    const { auth } = getState()
  
    if (auth?.user?.access_token) {
      console.log()
      headers["Authorization"] = `Bearer ${auth?.user?.access_token}`;
    }
    return headers;
  },
});
export const APIBaseQuery = async (args: any, api: any, extraOptions: any) => {
  let result = await APIBaseQueryInterceptor(args, api, extraOptions);
  if (result.error) {
    console.log("Error an occured");
  }
  return result;
};
