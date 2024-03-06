import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { message } from "antd";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryError } from "node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes";
import { RootState } from "../store";
import { setToken } from "../features/auth/AuthSlice";

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
  headers: (
    headers: AxiosRequestConfig["headers"] = {},
    { getState }: { getState: () => any }
  ) => {
    const { auth } = getState();

    if (auth?.user?.access_token) {
      headers["Authorization"] = `Bearer ${auth?.user?.access_token}`;
    }
    return headers;
  },
});

// export const APIBaseQuery = async (args: any, api: any, extraOptions: any) => {
//   let result = await APIBaseQueryInterceptor(args, api, extraOptions);
//   if (result.error) {
//     if (result.error && result.error.data && result.error.data.message) {
//       message.error(result.error?.data?.message);
//     }
//   }
//   return result;
// };

export const APIBaseQuery = async (args: any, api: any, extraOptions: any) => {
  let result = await APIBaseQueryInterceptor(args, api, extraOptions);
  const state: any = api;
  const userState: any = state.getState() as RootState;
  const { user } = userState;
  console.log(
    {userState: userState?.auth?.user}
  )

  // console.log(result.data.message)
  if (
      result.error
  ) {
      const state: any = api;
      const userState: any = state.getState() as RootState;
      
      const refresh_token  = userState?.auth?.user?.refresh_token;
      console.log()
      const refreshResult = await APIBaseQueryInterceptor(
          { url: "api/v1/auth/refresh-token", method: "POST", data: { refresh_token } },
          api,
          extraOptions
      );
      console.log(refreshResult)
      if (refreshResult?.data) {
          const data: any = refreshResult?.data;
          const { access_token, refresh_token, expires_at } = data;
          await state.dispatch(setToken({ access_token, refresh_token, expires_at }));
          result = await APIBaseQueryInterceptor(args, api, extraOptions);
      } else {
          // state.dispatch(revertAll());
      }
  }
  else if (result.error) {
      api.dispatch(revertAll());
  }
  else if (result.error) {
    if (result.error && result.error.data && result.error.data.message) {
            message.error(result.error?.data?.message);
          }
  }
  return result;
};