import {registerPet} from "@/api/mutations/pets/pets";
import {PetInfos} from "@/api/dtos/pet.dto";
import {useMutation} from "@tanstack/react-query";

export const useRegisterPet = () => {
  return useMutation({
    mutationFn: async (data: Partial<PetInfos>) => {
      if (!data.owner) {
        throw new Error("Owner is required");
      }

      const dataWithStatus: PetInfos = {
        ...data,
        id: crypto.randomUUID(),
        status: "Disponivel",
      } as PetInfos;

      const registeredPet = await registerPet(dataWithStatus);
      return registeredPet;
    },
  });
};
