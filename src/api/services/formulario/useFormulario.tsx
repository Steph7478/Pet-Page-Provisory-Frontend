import {createFormulario} from "@/api/mutations/adoption/formulario";
import {updatePet} from "@/api/mutations/pets/pets";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Formulário} from "@/api/dtos/formulario.dto";
import {getFormulario} from "@/api/queries/adoption/formulario";

export const useFormularioByPetId = (id: string) => {
  return useQuery<Formulário>({
    queryKey: ["formulario", id],
    queryFn: () => getFormulario(id),
    enabled: !!id,
  });
};

export const useFormulario = () => {
  return useMutation({
    mutationFn: async (formData: Formulário) => {
      const formularioCriado = await createFormulario(formData);

      if (formularioCriado && formData.petId) {
        await updatePet(formData.petId, {status: "Pendente"});
      }

      return formularioCriado;
    },
  });
};
