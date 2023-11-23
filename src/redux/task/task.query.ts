import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";
import { URL_SERVER } from "../api/api.constant";

const baseUrl = URL_SERVER;

interface IUpdateStatus {
  taskId: string;
  planId: string;
}

interface CreateTaskDto {
  title: string;
  durection: number;
  descriptions: string;
  templateId: string;
}

export const taskApi = createApi({
  reducerPath: "task-api",
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
    update: builder.mutation({
      query: (data: IUpdateStatus) => {
        return {
          url: "/tasks/done",
          method: "PUT",
          body: data,
        };
      },
    }),
    create: builder.mutation({
      query: (data: CreateTaskDto) => {
        return {
          url: "/tasks",
          method: "POST",
          body: data,
        };
      },
    }),
    delete: builder.mutation({
      query: (id: string) => {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateTask: builder.mutation({
      query: (data: any) => {
        return {
          url: `/tasks`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useUpdateMutation,
  useCreateMutation,
  useDeleteMutation,
  useUpdateTaskMutation,
} = taskApi;
