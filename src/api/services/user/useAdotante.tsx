import {getAdoptionByClientId} from "@/api/queries/adoption/adoption";
import {getPetById} from "@/api/queries/pets/pets";
import {useQuery} from "@tanstack/react-query";

export const usePetsByClient = (clientId: string) => {
  return useQuery({
    queryKey: ["pets-by-client", clientId],

    queryFn: async () => {
      const adoption = await getAdoptionByClientId(clientId);
      const petIds: string[] = adoption.pet || [];

      if (petIds.length === 0) return [];

      const petPromises = petIds.map((id) => getPetById(id));

      const pets = await Promise.all(petPromises);

      return pets;
    },
    staleTime: 5 * 60 * 1000,
  });
};
