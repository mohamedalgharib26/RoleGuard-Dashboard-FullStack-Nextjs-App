import { fetchApi, User } from "@/store/Api/ReactQuery";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
  return useQuery({
    queryFn: () => fetchApi<User>("users"),
    queryKey: ["users"],
  });
};
