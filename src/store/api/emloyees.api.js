import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["EmployeesList"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
      providesTags: ["EmployeesList"],
    }),
    addEmployees: builder.mutation({
      query: (newEmployees) => ({
        url: "/add_employees",
        method: "POST",
        body: newEmployees,
      }),
      invalidatesTags: ["EmployeesList"],
    }),
  }),
});

export const { useGetEmployeesQuery, useAddEmployeesMutation } = employeesApi;
