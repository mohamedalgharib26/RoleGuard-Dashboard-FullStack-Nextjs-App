import { fetchApi } from "@/store/Api/ReactQuery";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = () => {
  return useQuery({
    queryFn: () =>
      fetchApi<User>("users", {
        withPagination: false,
      }),
    queryKey: ["users"],
  });
};
