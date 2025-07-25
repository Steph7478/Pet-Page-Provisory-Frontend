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
