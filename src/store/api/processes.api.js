import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToProcesses } from "../slices";

export const processesApi = createApi({
  reducerPath: "processesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ProcessesList", "ProcessesListMembers"],
  endpoints: (builder) => ({
    getProcesses: builder.query({
      query: () => ({
        url: "/get_processes",
        method: "GET",
      }),
      providesTags: ["ProcessesList"],
    }),
    getProcessesById: builder.query({
      query: (id) => ({
        url: `/get_processes/${id}`,
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
    getProcessesMembers: builder.query({
      query: () => ({
        url: "/get_processes_members",
        method: "GET",
      }),
      providesTags: ["ProcessesListMembers"],
    }),
    addProcessesMembers: builder.mutation({
      query: (members) => ({
        url: "/add_process_member",
        method: "POST",
        body: members,
      }),
      invalidatesTags: ["ProcessesListMembers"],
    }),
  }),
});

export const {
  useGetProcessesQuery,
  useAddProcessesMutation,
  useGetProcessesMembersQuery,
  useAddProcessesMembersMutation,
  useGetProcessesByIdQuery,
} = processesApi;
