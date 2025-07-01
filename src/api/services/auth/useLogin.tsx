import {useMutation, useQueryClient} from "@tanstack/react-query";
import {loginUser} from "@/api/mutations/auth/login";
import {useRouter} from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["auth"]});

      router.push("/adotar");
    },
  });
};
