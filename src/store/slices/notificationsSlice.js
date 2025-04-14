import { createSlice } from "@reduxjs/toolkit";
import { getStorageData, setStorageData } from "../../utils";
import { storageKeys } from "../../enums";

const initialState = {
  notifications: getStorageData(storageKeys.NOTIFICATIONS),
};

export const notificationsSlice = createSlice({
  name: storageKeys.NOTIFICATIONS,
  initialState,
  reducers: {
    addToNotifications: (state, action) => {
      state.notifications = [...state.notifications, ...action.payload];
      setStorageData(storageKeys.NOTIFICATIONS, state.notifications);
    },
    editNotifications: (state, action) => {
      const updatedNotification = action.payload;
      state.notifications = state.notifications.map((notif) =>
        notif.doc_id === updatedNotification.doc_id
          ? updatedNotification
          : notif
      );
      setStorageData(storageKeys.NOTIFICATIONS, state.notifications);
    },

    removeFromNotifications: (state, action) => {},

    clearNotifications: (state) => {},
  },
});

export const {
  addToNotifications,
  editNotifications,
  removeFromNotifications,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
