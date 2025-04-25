import { useGetEmployeesQuery } from "../store";

export const useEmployee = (employee_id) => {
  const { data } = useGetEmployeesQuery();

  return data?.data?.filter((item) => item.process_id === employee_id);
};
