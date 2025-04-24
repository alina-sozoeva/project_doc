import { useSelector } from "react-redux";
import { useGetEmployeesQuery } from "../store";

export const useUser = () => {
  const { data } = useGetEmployeesQuery();
  const user = useSelector((state) => state.users.user);

  if (!data || !user) return null;

  return data?.data?.find((item) => item.guid === user.guid) || [];
};
