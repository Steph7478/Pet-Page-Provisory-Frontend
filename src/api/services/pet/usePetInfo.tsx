import {getPetById, getPets} from "@/api/queries/pets/pets";
import {useQuery} from "@tanstack/react-query";

export const usePetInfo = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
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
