import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";

const baseUrl = "http://localhost:5000";

interface ITemplate {
  name: string;
}

interface Params {
  offset?: number;
  limit?: number;
}

export const templateApi = createApi({
  reducerPath: "template-api",
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
    getAll: builder.query({
      query: (params: Params) => ({
        url: `/templates?limit=${params?.limit}&offset=${params?.offset}`,
        method: "GET",
      }),
    }),
    getOne: builder.query({
      query: (id: number) => ({
        url: `/templates/${id}`,
        method: "GET",
      }),
    }),
    create: builder.mutation({
      query: (data: ITemplate) => {
        return {
          url: "/templates",
          method: "POST",
          body: data,
        };
      },
    }),
    update: builder.mutation({
      query: (data: any) => {
        return {
          url: "/templates",
          method: "PUT",
          body: data,
        };
      },
    }),
    delete: builder.mutation({
      query: (id: number) => {
        return {
          url: `/templates/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = templateApi;
