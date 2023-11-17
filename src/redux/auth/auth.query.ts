import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";

const baseUrl = "http://localhost:5000";

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
        console.log(getAuthToken());
        headers.set("authorization", `Bearer ${getAuthToken()}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: IUser) => {
        console.log(user);
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
