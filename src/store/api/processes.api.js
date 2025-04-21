import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToProcesses } from "../slices";

export const processesApi = createApi({
  reducerPath: "processesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ProcessesList"],
  endpoints: (builder) => ({
    getProcesses: builder.query({
      query: () => ({
        url: "/get_processes",
        method: "GET",
      }),
      providesTags: ["ProcessesList"],
    }),
    addProcesses: builder.mutation({
      query: (newProcesses) => ({
        url: "/add_processes",
        method: "POST",
        body: newProcesses,
      }),
      invalidatesTags: ["ProcessesList"],
    }),
  }),
});

export const { useGetProcessesQuery, useAddProcessesMutation } = processesApi;
