import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../enums";
import { getStorageData, setStorageData } from "../../utils";

const initialState = {
  processes: getStorageData(storageKeys.PROCESSES),
  processesMembers: getStorageData(storageKeys.PROCESSES_MEMBERS),
};

export const processesSlice = createSlice({
  name: storageKeys.PROCESSES,
  initialState,
  reducers: {
    //processes
    addToProcesses: (state, action) => {
      state.processes = [...state.processes, ...action.payload];
      setStorageData(storageKeys.PROCESSES, state.processes);
    },
    //processesMembers
    addToProcessesMembers: (state, action) => {
      state.processesMembers = [...state.processesMembers, ...action.payload];
      setStorageData(storageKeys.PROCESSES_MEMBERS, state.processesMembers);
    },
  },
});

export const { addToProcesses, addToProcessesMembers } = processesSlice.actions;

export default processesSlice.reducer;
