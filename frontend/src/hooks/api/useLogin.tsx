import {useMutation, useQueryClient} from "@tanstack/react-query";
import {loginUser} from "@/services/api/auth/login";
import {useRouter} from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["auth"]});

      router.push("/adotar");
    },
  });
};
