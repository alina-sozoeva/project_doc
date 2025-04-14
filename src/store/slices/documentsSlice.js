import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../enums";
import { getStorageData, setStorageData } from "../../utils";

const initialState = {
  documents: getStorageData(storageKeys.DOCUMENTS),
};

export const documentsSlice = createSlice({
  name: storageKeys.DOCUMENTS,
  initialState,
  reducers: {
    addToDocuments: (state, action) => {
      state.documents = [...state.documents, ...action.payload];
      setStorageData(storageKeys.DOCUMENTS, state.documents);
    },
  },
});

export const { addToDocuments } = documentsSlice.actions;

export default documentsSlice.reducer;
