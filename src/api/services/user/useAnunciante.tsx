import {
  approveAdoption,
  cancelAdoption,
  rejectAdoption,
} from "@/api/mutations/adoption/adoption";
import {getPetsByAdvertiserId} from "@/api/queries/pets/pets";
import {useMutation, useQuery} from "@tanstack/react-query";

export const usePetsByAdvertiser = (owner: string) => {
  return useQuery({
    queryKey: ["pets-by-advertiser", owner],
    queryFn: () => getPetsByAdvertiserId(owner),
    enabled: !!owner,
  });
};

export const useAllowAdoption = () => {
  return useMutation({
    mutationFn: approveAdoption,
  });
};

export const useDenyAdoption = () => {
  return useMutation({
    mutationFn: rejectAdoption,
  });
};
export const useCancelAdoption = () => {
  return useMutation({
    mutationFn: cancelAdoption,
  });
};
