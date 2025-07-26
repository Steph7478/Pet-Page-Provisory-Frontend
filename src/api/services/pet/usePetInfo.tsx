import {getPetById, getPets} from "@/api/queries/pets/pets";
import {useQuery} from "@tanstack/react-query";

export const usePetInfo = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
  });
};

export const usePetById = (petId: string) => {
  return useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetById(petId),
    enabled: !!petId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePetsByIds = (petIds: string[]) => {
  return useQuery({
    queryKey: ["pets", petIds],
    queryFn: async () => {
      const pets = await Promise.all(petIds.map((id) => getPetById(id)));
      return pets;
    },
    enabled: petIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
