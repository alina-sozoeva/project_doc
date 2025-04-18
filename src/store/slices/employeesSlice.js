import { createSlice } from "@reduxjs/toolkit";
import { getStorageData, setStorageData } from "../../utils";
import { storageKeys } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import foto from "../../assets/foto.jpg";
import { employeesArray } from "../../constants";

const initialState = {
  employees: getStorageData(storageKeys.EMPLOYEES, employeesArray),
};

export const employeesSlice = createSlice({
  name: storageKeys.EMPLOYEES,
  initialState,
  reducers: {
    addToEmployees: (state, action) => {
      state.employees = [...state.employees, ...action.payload];
      setStorageData(storageKeys.EMPLOYEES, state.employees);
    },
    editEmployees: (state, action) => {
      const updatedEmployees = action.payload;
      state.employees = state.employees.map((item) =>
        item.doc_id === updatedEmployees.doc_id ? updatedEmployees : item
      );
      setStorageData(storageKeys.EMPLOYEES, state.notifArr);
    },

    removeFromEmployees: (state, action) => {},

    clearEmployees: (state) => {},
  },
});

export const {
  addToEmployees,
  editEmployees,
  removeFromEmployees,
  clearEmployees,
} = employeesSlice.actions;

export default employeesSlice.reducer;
