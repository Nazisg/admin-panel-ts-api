import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface AuthState {
  id: number;
  access_token?: string;
}

interface APIResult {
  data?: any;
  error?: {
    status?: number;
    data?: any;
  };
}

interface HeadersFunction {
  (
    headers: Record<string, string>,
    context: { getState: () => { auth: AuthState }; signal: AbortSignal }
  ): Record<string, string>;
}

interface BaseQueryOptions {
  url: string;
  params?: Record<string, any>;
  method?: string;
  data?: any;
  responseType?: string;
}

const baseURL: string = `${import.meta.env.VITE_BASE_URL}`;

export const axiosBaseQuery =
  ({
    baseURL = "",
    headers,
  }: {
    baseURL?: string;
    headers?: HeadersFunction;
  }) =>
  async (
    { url, params, method, data, responseType }: BaseQueryOptions,
    {
      signal,
      getState,
    }: { signal: AbortSignal; getState: () => { auth: AuthState } }
  ): Promise<APIResult> => {
    try {
      const result = await axios({
        url: baseURL + url,
        method: method ? method : "GET",
        ...(params && { params: params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
        ...(data && { data: data }),
        responseType: responseType ? responseType : "json",
      } as AxiosRequestConfig);
      return {
        data: result.data,
      };
    } catch (axiosError: unknown) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseURL: baseURL,
  headers: (headers, { getState }) => {
    const { auth } = getState();
    if (auth?.access_token) {
      headers["Authorization"] = `${auth?.access_token}`;
    }
    return headers;
  },
});

export const APIBaseQuery = async (
  args: BaseQueryOptions,
  api: any
): Promise<APIResult> => {
  let result = await APIBaseQueryInterceptor(args, api);
  if (result.error) {
    console.log("Error an occured");
  }
  return result;
};
