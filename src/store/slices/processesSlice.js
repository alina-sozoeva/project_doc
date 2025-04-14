import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../enums";
import { getStorageData, setStorageData } from "../../utils";

const initialState = {
  processesArr: getStorageData(storageKeys.PROCESSES),
  processMembersArr: getStorageData(storageKeys.PROCESSES_MEMBERS),
};

export const processesSlice = createSlice({
  name: storageKeys.PROCESSES,
  initialState,
  reducers: {
    //processesArr
    addToProcesses: (state, action) => {
      state.processesArr = [...state.processesArr, ...action.payload];
      setStorageData(storageKeys.PROCESSES, state.processesArr);
    },
    //processMembersArr
    addToProcessesMembers: (state, action) => {
      state.processMembersArr = [...state.processMembersArr, ...action.payload];
      setStorageData(storageKeys.PROCESSES_MEMBERS, state.processMembersArr);
    },
  },
});

export const { addToProcesses, addToProcessesMembers } = processesSlice.actions;

export default processesSlice.reducer;
