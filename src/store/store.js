import { configureStore } from "@reduxjs/toolkit";
import {
  documentsSlice,
  employeesSlice,
  notificationsSlice,
  processesSlice,
} from "./slices";
import { employeesApi, processesApi } from "./api";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [processesApi.reducerPath]: processesApi.reducer,
    notifications: notificationsSlice.reducer,
    employees: employeesSlice.reducer,
    documents: documentsSlice.reducer,
    processes: processesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(processesApi.middleware),
});
