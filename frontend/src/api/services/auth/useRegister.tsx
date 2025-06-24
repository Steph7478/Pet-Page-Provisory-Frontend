import {createUser} from "@/api/mutations/auth/register";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["auth"]});
      router.push("/adotar");
    },
  });
};
