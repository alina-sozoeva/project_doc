import { createSlice } from "@reduxjs/toolkit";

const loadNotifications = () => {
  const data = localStorage.getItem("notifications");
  return data ? JSON.parse(data) : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

const initialState = {
  notifArr: loadNotifications(),
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addToNotifications: (state, action) => {
      state.notifArr = [...state.notifArr, ...action.payload];
      saveNotifications(state.notifArr);
    },
    editNotifications: (state, action) => {
      const updatedNotification = action.payload;
      state.notifArr = state.notifArr.map((notif) =>
        notif.doc_id === updatedNotification.doc_id
          ? updatedNotification
          : notif
      );
      saveNotifications(state.notifArr);
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
