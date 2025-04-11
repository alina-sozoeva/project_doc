import { createSlice } from "@reduxjs/toolkit";
import { getStorageData, setStorageData } from "../../utils";
import { storageKeys } from "../../enums";

const initialState = {
  notifArr: getStorageData(storageKeys.NOTIFICATIONS),
};

export const notificationsSlice = createSlice({
  name: storageKeys.NOTIFICATIONS,
  initialState,
  reducers: {
    addToNotifications: (state, action) => {
      state.notifArr = [...state.notifArr, ...action.payload];
      setStorageData(storageKeys.NOTIFICATIONS, state.notifArr);
    },
    editNotifications: (state, action) => {
      const updatedNotification = action.payload;
      state.notifArr = state.notifArr.map((notif) =>
        notif.doc_id === updatedNotification.doc_id
          ? updatedNotification
          : notif
      );
      setStorageData(storageKeys.NOTIFICATIONS, state.notifArr);
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
