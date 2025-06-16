import {registerPet} from "@/services/api/pets";
import {useMutation} from "@tanstack/react-query";
import {PetInfos} from "@/types/pet";

export const useRegisterPet = () => {
  return useMutation({
    mutationFn: async (data: PetInfos) => {
      const dataWithStatus = {
        ...data,
        status: "Disponivel",
      };

      const registeredPet = await registerPet(dataWithStatus);

      return registeredPet;
    },
  });
};
