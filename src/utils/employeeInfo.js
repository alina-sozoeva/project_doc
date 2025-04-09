import { getEmployeesArr, getUserInfo } from "./storageHelpers";

export const employeeInfo = () => {
  const userInfo = getUserInfo();
  const employeesArr = getEmployeesArr();

  if (userInfo === "admin@gmail.com") {
    return {
      email: "admin@gmail.com",
      fio: "Admin",
      id: 123,
    };
  }

  return employeesArr?.find((item) => item.email === userInfo);
};
