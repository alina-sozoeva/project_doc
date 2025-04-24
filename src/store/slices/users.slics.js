import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../enums";
import { getStorageData, setStorageData } from "../../utils";

const initialState = {
  user: getStorageData(storageKeys.USER),
};

export const usersSlice = createSlice({
  name: storageKeys.USER,
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      setStorageData(storageKeys.USER, state.user);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
