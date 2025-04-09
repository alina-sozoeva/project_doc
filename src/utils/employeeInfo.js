export const employeeInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const employeesArr = JSON.parse(localStorage.getItem("employeesArr"));

  if (userInfo === "admin@gmail.com") {
    return {
      email: "admin@gmail.com",
      fio: "Admin",
      id: 123,
    };
  }

  return employeesArr?.find((item) => item.email === userInfo);
};
