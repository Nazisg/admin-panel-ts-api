import { createApi } from "@reduxjs/toolkit/query/react";
import { APIBaseQuery } from "../axiosBase";

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    mail: builder.mutation({
      query: (data) => ({
        url: `users/forget-password-email?email=${data}`,
        method: "POST",
      }),
    }),
    otp: builder.mutation({
      query: (otp) => ({
        url: "users/forget-password-otp",
        method: "POST",
        data: { otp },
      }),
    }),
    confirmPassword: builder.mutation({
      query: ({ mail, ...data }) => {
        return {
          url: `users/confirm-password?mail=${encodeURIComponent(mail)}`,
          method: "PUT",
          data,
        };
      },
    }),
  }),
});

export const { useMailMutation, useOtpMutation, useConfirmPasswordMutation } =
  otpApi;

export default otpApi;
