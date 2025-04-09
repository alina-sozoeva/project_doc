export const getUserInfo = () => JSON.parse(localStorage.getItem("userInfo"));

export const getEmployeesArr = () =>
  JSON.parse(localStorage.getItem("employeesArr"));

export const getStepDataList = () =>
  JSON.parse(localStorage.getItem("stepDataList"));

export const getFolderArr = () => JSON.parse(localStorage.getItem("folderArr"));
