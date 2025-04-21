import { configureStore } from "@reduxjs/toolkit";
import {
  documentsSlice,
  employeesSlice,
  notificationsSlice,
  processesSlice,
} from "./slices";
import { documentsApi, employeesApi, processesApi } from "./api";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [processesApi.reducerPath]: processesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    notifications: notificationsSlice.reducer,
    employees: employeesSlice.reducer,
    documents: documentsSlice.reducer,
    processes: processesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      employeesApi.middleware,
      processesApi.middleware,
      documentsApi.middleware,
    ]),
});
