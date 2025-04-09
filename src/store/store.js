import { configureStore } from "@reduxjs/toolkit";
import { notificationsSlice } from "./slices";

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
  },
});
