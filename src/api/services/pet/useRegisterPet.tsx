import {RegisterPet} from "@/api/dtos/pet.dto";
import {registerPet} from "@/api/mutations/pets/pets";
import {useMutation} from "@tanstack/react-query";

export const useRegisterPet = () => {
  return useMutation({
    mutationFn: async (data: RegisterPet) => {
      const registeredPet = await registerPet(data);
      return registeredPet;
    },
  });
};
