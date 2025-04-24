import { useGetProcessesMembersQuery } from "../store";

export const useProcessesMembers = (process_id) => {
  const { data } = useGetProcessesMembersQuery();

  return data?.data?.filter((item) => item.process_id === process_id);
};
