import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";

const baseUrl = "http://localhost:5000";

interface IPlan {
  templateId: number;
  deadline: string;
}

interface IPlanWithTask {
  planId: number;
  taskId: number;
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
    getAll: builder.query({
      query: () => ({
        url: "/plans",
        method: "GET",
      }),
    }),
    getOne: builder.query({
      query: (id: number) => ({
        url: `/plans/${id}`,
        method: "GET",
      }),
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
      query: (planId: number) => {
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
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useDeletePlanMutation,
} = planApi;
