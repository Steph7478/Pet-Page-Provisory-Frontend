import {createUser} from "@/services/api/auth/register";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["auth"]});
      router.push("/adotar");
    },
  });
};
