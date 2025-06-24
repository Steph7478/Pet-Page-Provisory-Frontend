import {ApproveAdoptionPayload} from "@/api/dtos/adopton.dto";
import {updateAdoption} from "@/api/mutations/adoption/adoption";
import {deleteFormulario} from "@/api/mutations/adoption/formulario";
import {updatePet} from "@/api/mutations/pets/pets";
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
    mutationFn: async ({id, clientId}: ApproveAdoptionPayload) => {
      await updatePet(id, {status: "Indisponivel"});
      await updateAdoption(clientId, {id: [id]});
    },
  });
};

export const useDenyAdoption = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await updatePet(id, {status: "Disponivel"});
      await deleteFormulario(id);
    },
  });
};
