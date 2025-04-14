import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "employees",
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
  }),
});
