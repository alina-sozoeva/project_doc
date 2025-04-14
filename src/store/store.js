import { configureStore } from "@reduxjs/toolkit";
import {
  documentsSlice,
  employeesSlice,
  notificationsSlice,
  processesSlice,
} from "./slices";

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    emloyees: employeesSlice.reducer,
    documents: documentsSlice.reducer,
    processes: processesSlice.reducer,
  },
});
