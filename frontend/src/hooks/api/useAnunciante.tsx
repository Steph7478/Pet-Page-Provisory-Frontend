import {updateAdoption} from "@/services/api/adoption/adoption";
import {deleteFormulario} from "@/services/api/adoption/formulario";
import {getPetsByAdvertiserId, updatePet} from "@/services/api/pets";
import {ApproveAdoptionPayload} from "@/types/adopton";
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
    mutationFn: async ({id, clientId}: ApproveAdoptionPayload) => {
      await updatePet(id, {status: "indisponivel"});
      await updateAdoption(clientId, {id: [id]});
    },
  });
};

export const useDenyAdoption = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await updatePet(id, {status: "disponivel"});
      await deleteFormulario(id);
    },
  });
};
