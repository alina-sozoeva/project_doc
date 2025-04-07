export  const employeeInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const employeesArr = JSON.parse(localStorage.getItem("employeesArr"));

  return employeesArr?.find((item) => item.email === userInfo);
};
