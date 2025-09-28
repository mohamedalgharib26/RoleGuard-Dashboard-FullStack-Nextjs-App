import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../store/Api/ReactQuery";

export const useFetchUsers = () => {
  return useQuery({
    queryFn: fetchUsers,
    queryKey: ["users"],
  });
};
