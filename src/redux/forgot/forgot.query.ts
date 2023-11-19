import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_SERVER } from "../api/api.constant";

const baseUrl = URL_SERVER;

interface IForgotPassword {
  password: string;
  token: string;
}

export const forgotApi = createApi({
  reducerPath: "forgot-api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    forgot: builder.mutation({
      query: (email: string) => {
        return {
          url: "/forgot",
          method: "POST",
          body: { email },
        };
      },
    }),
    forgotReset: builder.query({
      query: (token: string) => ({
        url: `/forgot/reset/${token}`,
        method: "GET",
      }),
    }),
    reset: builder.mutation({
      query: (data: IForgotPassword) => {
        return {
          url: `/forgot/reset/${data.token}`,
          method: "POST",
          body: {
            password: data.password,
          },
        };
      },
    }),
  }),
});

export const { useForgotMutation, useForgotResetQuery, useResetMutation } =
  forgotApi;
