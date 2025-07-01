import {getPetById, getPets} from "@/api/queries/pets/pets";
import {useQuery} from "@tanstack/react-query";

export const usePetInfo = () => {
  return useQuery({
    queryKey: ["pets"],
    queryFn: getPets,
  });
};

export const usePetById = (id: string) => {
  return useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPetById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
