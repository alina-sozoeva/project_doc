import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentsApi = createApi({
  reducerPath: "documemtsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: [
    "DocsCloseList",
    "DocsSoglosovanieList",
    "DocsVyplataList",
    "DocsZakupList",
    "DocsContragentList",
    "DocsStatuses",
    "DocCounts",
    "AllDoc",
    "DocsById",
    "DocFavorites",
  ],
  endpoints: (builder) => ({
    getDocsById: builder.query({
      query: ({ guid }) => ({
        url: `/get_docs/${guid}`,
        method: "GET",
        params: { guid },
      }),
      providesTags: ["DocsById"],
    }),
    getDocsClose: builder.query({
      query: ({ process_id, employee_id }) => ({
        url: "/get_docs_close",
        method: "GET",
        params: { process_id, employee_id },
      }),
      providesTags: ["DocsCloseList"],
    }),
    getDocsSoglosovanie: builder.query({
      query: ({ process_id, employee_id }) => ({
        url: "/get_docs_soglosovanie",
        method: "GET",
        params: { process_id, employee_id },
      }),
      providesTags: ["DocsSoglosovanieList"],
    }),
    getDocsVyplata: builder.query({
      query: ({ process_id, employee_id }) => ({
        url: "/get_docs_vyplata",
        method: "GET",
        params: { process_id, employee_id },
      }),
      providesTags: ["DocsVyplataList"],
    }),
    getDocsZakup: builder.query({
      query: ({ process_id, employee_id }) => ({
        url: "/get_docs_zakup",
        method: "GET",
        params: { process_id, employee_id },
      }),
      providesTags: ["DocsZakupList"],
    }),
    getDocsContragent: builder.query({
      query: ({ process_id, employee_id }) => ({
        url: "/get_docs_contragent",
        method: "GET",
        params: { process_id, employee_id },
      }),
      providesTags: ["DocsContragentList"],
    }),
    addDocsClose: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_close",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsCloseList"],
    }),
    addDocsSoglosovanie: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_soglosovanie",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsSoglosovanieList"],
    }),
    addDocsVyplata: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_vyplata",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsVyplataList"],
    }),
    addDocsZakup: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_zakup",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsZakupList"],
    }),
    addDocsContragent: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_contragent",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsContragentList"],
    }),
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
    updateDocsClose: builder.mutation({
      query: (doc) => ({
        url: "/update_docs_close",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["DocsCloseList"],
    }),
    updateDocsSoglosovanie: builder.mutation({
      query: (doc) => ({
        url: "/update_docs_soglosovanie",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["DocsSoglosovanieList"],
    }),
    updateDocsContragent: builder.mutation({
      query: (doc) => ({
        url: "/update_docs_contragent",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["DocsContragentList"],
    }),
    updateDocsVyplata: builder.mutation({
      query: (doc) => ({
        url: "/update_docs_vyplata",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["DocsVyplataList"],
    }),
    updateDocsZakup: builder.mutation({
      query: (doc) => ({
        url: "/update_docs_zakup",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["DocsZakupList"],
    }),
    getDocsStatuses: builder.query({
      query: () => ({
        url: "/get_docs_statuses",
        method: "GET",
      }),
      providesTags: ["DocsStatuses"],
    }),
    addDocsStatuses: builder.mutation({
      query: (newDocs) => ({
        url: "/add_docs_statuses",
        method: "POST",
        body: newDocs,
      }),
      invalidatesTags: ["DocsStatuses"],
    }),
    getDocCounts: builder.query({
      query: ({ employee_id }) => ({
        url: "/get_all_doc_counts",
        method: "GET",
        params: { employee_id },
      }),
      providesTags: ["DocCounts"],
    }),
    getAllDocs: builder.query({
      query: ({ user_id }) => ({
        url: "/get_all_docs",
        method: "GET",
        params: { user_id },
      }),
      providesTags: ["AllDoc"],
    }),
    updateReadStatus: builder.mutation({
      query: (info) => ({
        url: "/update_read_status",
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["DocCounts", "AllDoc"],
    }),
    getFavoritesDocs: builder.query({
      query: ({ user_id }) => ({
        url: "/get_favorites_docs",
        method: "GET",
        params: { user_id },
      }),
      providesTags: ["DocFavorites"],
    }),
    addFavoritesDocs: builder.mutation({
      query: (newFavorites) => ({
        url: "/add_favorites_docs",
        method: "POST",
        body: newFavorites,
      }),
      invalidatesTags: ["DocFavorites"],
    }),
  }),
});

export const {
  useGetDocsByIdQuery,
  useGetDocsCloseQuery,
  useGetDocsContragentQuery,
  useGetDocsVyplataQuery,
  useGetDocsZakupQuery,
  useGetDocsSoglosovanieQuery,
  useAddDocsSoglosovanieMutation,
  useAddDocsCloseMutation,
  useAddDocsContragentMutation,
  useAddDocsVyplataMutation,
  useAddDocsZakupMutation,
  useUploadFileMutation,
  useUpdateDocsCloseMutation,
  useUpdateDocsSoglosovanieMutation,
  useUpdateDocsContragentMutation,
  useUpdateDocsVyplataMutation,
  useUpdateDocsZakupMutation,
  useAddDocsStatusesMutation,
  useUpdateMutation,
  useGetDocsStatusesQuery,
  useGetDocCountsQuery,
  useGetAllDocsQuery,
  useUpdateReadStatusMutation,
  useGetFavoritesDocsQuery,
  useAddFavoritesDocsMutation,
} = documentsApi;
