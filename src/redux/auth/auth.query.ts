import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";
import { URL_SERVER } from "../api/api.constant";

const baseUrl = URL_SERVER;

interface IUser {
  email: string;
  password: string;
}
export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (getAuthToken()) {
        headers.set("authorization", `Bearer ${getAuthToken()}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: IUser) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: user,
        };
      },
    }),
    login: builder.mutation({
      query: (user: IUser) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } =
  authApi;
