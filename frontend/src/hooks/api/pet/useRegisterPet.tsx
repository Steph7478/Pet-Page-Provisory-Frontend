import {registerPet} from "@/services/api/pets";
import {PetInfos} from "@/types/pet";
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
