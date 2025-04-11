import { configureStore } from "@reduxjs/toolkit";
import { employeesSlice, notificationsSlice } from "./slices";

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    emloyees: employeesSlice.reducer,
  },
});
