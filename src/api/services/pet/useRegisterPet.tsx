import {RegisterPet} from "@/api/dtos/pet.dto";
import {registerPet} from "@/api/mutations/pets/pets";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useRegisterPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterPet) => {
      const registeredPet = await registerPet(data);
      return registeredPet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["pets"]});
    },
  });
};
