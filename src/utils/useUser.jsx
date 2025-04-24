import { useGetEmployeesQuery } from "../store";

export const useUser = () => {
  const { data } = useGetEmployeesQuery();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!data || !userInfo) return null;

  return data?.data?.find((item) => item.guid === userInfo.guid) || [];
};
