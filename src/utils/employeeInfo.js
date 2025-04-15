export const employeeInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const emloyees = JSON.parse(localStorage.getItem("employees"));

  if (userInfo === "admin@gmail.com") {
    return {
      email: "admin@gmail.com",
      fio: "Admin",
      id: 123,
    };
  }

  return emloyees?.find((item) => item.email === userInfo);
};
