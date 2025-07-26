import {getPetsByAdvertiserId} from "@/api/queries/pets/pets";
import {useQuery} from "@tanstack/react-query";

export const usePetsByAdvertiser = (ownerId: string) => {
  return useQuery({
    queryKey: ["pets-by-advertiser", ownerId],
    queryFn: () => getPetsByAdvertiserId(ownerId),
    enabled: !!ownerId,
  });
};
