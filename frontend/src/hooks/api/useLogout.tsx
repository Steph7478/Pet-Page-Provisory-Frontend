import {logout} from "@/services/api/auth/logout";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["auth"]});
    },
  });
};
