export const userInfo = JSON.parse(localStorage.getItem("userInfo"));
export const emloyees = JSON.parse(localStorage.getItem("employees"));

export const employeeInfo = () => {
  if (userInfo === "admin@gmail.com") {
    return {
      email: "admin@gmail.com",
      fio: "Admin",
      id: 123,
    };
  }

  return emloyees?.find((item) => item.email === userInfo);
};
