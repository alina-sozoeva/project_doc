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
    editDocuments: (state, action) => {
      const updatedDocuments = action.payload;
      console.log(updatedDocuments);

      state.documents = state.documents.map((item) =>
        item.guid === updatedDocuments.guid ? updatedDocuments : item
      );
      setStorageData(storageKeys.DOCUMENTS, state.documents);
    },
  },
});

export const { addToDocuments, editDocuments } = documentsSlice.actions;

export default documentsSlice.reducer;
