import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../enums";
import { getStorageData, setStorageData } from "../../utils";

const initialState = {
  documentsArr: getStorageData(storageKeys.DOCUMENTS),
};

export const documentsSlice = createSlice({
  name: storageKeys.DOCUMENTS,
  initialState,
  reducers: {
    addToDocuments: (state, action) => {
      state.documentsArr = [...state.documentsArr, ...action.payload];
      setStorageData(storageKeys.DOCUMENTS, state.documentsArr);
    },
  },
});

export const { addToDocuments } = documentsSlice.actions;

export default documentsSlice.reducer;
