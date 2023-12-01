import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/localStorage";
import { URL_SERVER } from "../api/api.constant";

const baseUrl = URL_SERVER;

interface IUpdateStatus {
  taskId: string;
  planId: string;
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
      query: (data: any) => {
        return {
          url: "/tasks",
          method: "POST",
          body: data,
          formData: true,
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
    deleteVideo: builder.mutation({
      query: (video: any) => {
        return {
          url: `/tasks/video/${video}`,
          method: "DELETE",
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
