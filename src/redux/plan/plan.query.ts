import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";
import { URL_SERVER } from "../api/api.constant";

const baseUrl = URL_SERVER;

interface IPlan {
  templateId: string;
  deadline: string;
}

interface IPlanWithTask {
  planId: string;
  taskId: string;
}
export const planApi = createApi({
  reducerPath: "plan-api",
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
    getAllCompleted: builder.query({
      query: (params) => ({
        url: `/plans/completed?limit=${params.limit}&offset=${params.offset}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getAllUncompleted: builder.query({
      query: (params) => ({
        url: `/plans/uncompleted?limit=${params.limit}&offset=${params.offset}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getOne: builder.query({
      query: (id: string) => ({
        url: `/plans/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    create: builder.mutation({
      query: (data: IPlan) => {
        return {
          url: "/plans",
          method: "POST",
          body: data,
        };
      },
    }),
    deleteTask: builder.mutation({
      query: (data: IPlanWithTask) => {
        return {
          url: `/plans/${data.planId}/remove/${data.taskId}`,
          method: "DELETE",
        };
      },
    }),
    deletePlan: builder.mutation({
      query: (planId: string) => {
        return {
          url: `/plans/${planId}`,
          method: "DELETE",
        };
      },
    }),
    getTask: builder.query({
      query: (data: IPlanWithTask) => ({
        url: `/plans/${data.planId}/${data.taskId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCompletedQuery,
  useGetAllUncompletedQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useDeletePlanMutation,
} = planApi;
