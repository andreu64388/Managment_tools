import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";

const baseUrl = "http://localhost:5000";

interface IUpdateStatus {
  taskId: number;
  planId: number;
}

interface CreateTaskDto {
  title: string;
  durection: number;
  descriptions: string;
  templateId: number;
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
      query: (id: number) => {
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
