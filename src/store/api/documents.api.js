import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToProcesses } from "../slices";

export const documentsApi = createApi({
  reducerPath: "documemtsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: [
    "DocsCloseList",
    "DocsSoglosovanieList",
    "DocsVyplataList",
    "DocsZakupList",
    "DocsContragentList",
  ],
  endpoints: (builder) => ({
    getDocsClose: builder.query({
      query: () => ({
        url: "/get_docs_close",
        method: "GET",
      }),
      providesTags: ["DocsCloseList"],
    }),
    getDocsSoglosovanie: builder.query({
      query: () => ({
        url: "/get_docs_soglosovanie",
        method: "GET",
      }),
      providesTags: ["DocsSoglosovanieList"],
    }),
    getDocsVyplata: builder.query({
      query: () => ({
        url: "/get_docs_vyplata",
        method: "GET",
      }),
      providesTags: ["DocsVyplataList"],
    }),
    getDocsZakup: builder.query({
      query: () => ({
        url: "/get_docs_zakup",
        method: "GET",
      }),
      providesTags: ["DocsZakupList"],
    }),
    getDocsContragent: builder.query({
      query: () => ({
        url: "/get_docs_contragent",
        method: "GET",
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
  }),
});

export const {
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
} = documentsApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const documentsApi = createApi({
//   reducerPath: "documentsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
//   tagTypes: ["DocsList"],
//   endpoints: (builder) => ({
//     getDocuments: builder.query({
//       query: (docType) => ({
//         url: `/get_docs_${docType}`,
//         method: "GET",
//       }),
//       providesTags: (docType) => [`DocsList-${docType}`],
//     }),

//     addDocument: builder.mutation({
//       query: ({ docType, newDoc }) => ({
//         url: `/add_docs_${docType}`,
//         method: "POST",
//         body: newDoc,
//       }),
//       invalidatesTags: ({ docType }) => [`DocsList-${docType}`],
//     }),

//     uploadFile: builder.mutation({
//       query: (formData) => ({
//         url: "/upload",
//         method: "POST",
//         body: formData,
//         formData: true,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetDocumentsQuery,
//   useAddDocumentMutation,
//   useUploadFileMutation,
// } = documentsApi;
