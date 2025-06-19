import {logout} from "@/services/api/auth/logout";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import router from "next/router";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["auth"]});
      router.push("/login");
    },
  });
};
