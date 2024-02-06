import {
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  
  export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
       baseUrl: "http://192.168.0.25:8085/api/v1/auth/login"
       }),
       endpoints:(builder)=>({
          loginUser: builder.mutation({
              query:(body:{email:string;password:string})=>{
                  return{
                      url:"/signin",
                      method:"post",
                      body,
                  };
              },
          }),
       }),
  });
  
  export const { useLoginUserMutation  } = authApi;
  