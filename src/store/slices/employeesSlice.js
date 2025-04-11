import { createSlice } from "@reduxjs/toolkit";
import { getStorageData, setStorageData } from "../../utils";
import { storageKeys } from "../../enums";

const initialState = {
  emloyeesArr: getStorageData(storageKeys.EMPLOYEES),
};

export const employeesSlice = createSlice({
  name: storageKeys.EMPLOYEES,
  initialState,
  reducers: {
    addToNotifications: (state, action) => {
      state.emloyeesArr = [...state.emloyeesArr, ...action.payload];
      setStorageData(storageKeys.EMPLOYEES, state.emloyeesArr);
    },
    editNotifications: (state, action) => {
      const updatedNotification = action.payload;
      state.notifArr = state.notifArr.map((notif) =>
        notif.doc_id === updatedNotification.doc_id
          ? updatedNotification
          : notif
      );
      setStorageData(storageKeys.EMPLOYEES, state.notifArr);
    },

    removeFromNotifications: (state, action) => {},

    clearNotifications: (state) => {},
  },
});

export default employeesSlice.reducer;
