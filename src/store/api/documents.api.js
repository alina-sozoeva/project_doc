// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { addToProcesses } from "../slices";

// export const documemtsApi = createApi({
//   reducerPath: "documemtsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
//   tagTypes: [
//     "DocsCloseList",
//     "DocsSoglosovanieList",
//     "DocsVyplataList",
//     "DocsZakupList",
//     "DocsContragentList",
//   ],
//   endpoints: (builder) => ({
//     getDocsClose: builder.query({
//       query: () => ({
//         url: "/get_docs_close",
//         method: "GET",
//       }),
//       providesTags: ["DocsCloseList"],
//     }),
//     getDocsSoglosovanie: builder.query({
//       query: () => ({
//         url: "/get_docs_soglosovanie",
//         method: "GET",
//       }),
//       providesTags: ["DocsSoglosovanieList"],
//     }),
//     getDocsVyplata: builder.query({
//       query: () => ({
//         url: "/get_docs_vyplata",
//         method: "GET",
//       }),
//       providesTags: ["DocsVyplataList"],
//     }),
//     getDocsZakup: builder.query({
//       query: () => ({
//         url: "/get_docs_zakup",
//         method: "GET",
//       }),
//       providesTags: ["DocsZakupList"],
//     }),
//     getDocsContragent: builder.query({
//       query: () => ({
//         url: "/get_docs_contragent",
//         method: "GET",
//       }),
//       providesTags: ["DocsContragentList"],
//     }),
//     addDocsClose: builder.mutation({
//       query: (newDocs) => ({
//         url: "/add_docs_close",
//         method: "POST",
//         body: newDocs,
//       }),
//       invalidatesTags: ["DocsCloseList"],
//     }),
//     addDocsSoglosovanie: builder.mutation({
//       query: (newDocs) => ({
//         url: "/add_docs_soglosovanie",
//         method: "POST",
//         body: newDocs,
//       }),
//       invalidatesTags: ["DocsSoglosovanieList"],
//     }),
//     addDocsVyplata: builder.mutation({
//       query: (newDocs) => ({
//         url: "/add_docs_vyplata",
//         method: "POST",
//         body: newDocs,
//       }),
//       invalidatesTags: ["DocsVyplataList"],
//     }),
//     addDocsZakup: builder.mutation({
//       query: (newDocs) => ({
//         url: "/add_docs_zakup",
//         method: "POST",
//         body: newDocs,
//       }),
//       invalidatesTags: ["DocsZakupList"],
//     }),
//     addDocsContragent: builder.mutation({
//       query: (newDocs) => ({
//         url: "/add_docs_contragent",
//         method: "POST",
//         body: newDocs,
//       }),
//       invalidatesTags: ["DocsContragentList"],
//     }),
//   }),
// });

// export const {} = documemtsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["DocsList"],
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (docType) => ({
        url: `/get_docs_${docType}`,
        method: "GET",
      }),
      providesTags: (result, error, docType) => [`DocsList-${docType}`],
    }),

    addDocument: builder.mutation({
      query: ({ docType, newDoc }) => ({
        url: `/add_docs_${docType}`,
        method: "POST",
        body: newDoc,
      }),
      invalidatesTags: (result, error, { docType }) => [`DocsList-${docType}`],
    }),
  }),
});

export const { useGetDocumentsQuery, useAddDocumentMutation } = documentsApi;
