import {PetInfos} from "@/api/dtos/pet.dto";
import {useQuery} from "@tanstack/react-query";
import {getPets} from "@/api/queries/pets/pets";

export const usePetInfo = () => {
  return useQuery<PetInfos[]>({
    queryKey: ["pets"],
    queryFn: getPets,
  });
};

export const usePetById = (petId: string) => {
  return useQuery<PetInfos | undefined>({
    queryKey: ["pets", petId],
    queryFn: async () => {
      const allPets = await getPets();
      return allPets.find((p: PetInfos) => p.petId === petId);
    },
    enabled: !!petId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePetsByIds = (petIds: string[]) => {
  return useQuery<PetInfos[]>({
    queryKey: ["pets", petIds],
    queryFn: async () => {
      const allPets = await getPets();
      return allPets.filter(
        (p: PetInfos) => p.petId && petIds.includes(p.petId)
      );
    },
    enabled: petIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
