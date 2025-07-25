import {createFormulario} from "@/api/mutations/adoption/formulario";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Formulário} from "@/api/dtos/formulario.dto";
import {getFormulario} from "@/api/queries/adoption/formulario";

export const useFormularioByPetId = (petId: string) => {
  return useQuery<Formulário>({
    queryKey: ["formulario", petId],
    queryFn: () => getFormulario(petId),
    enabled: !!petId,
  });
};

export const useFormulario = () => {
  return useMutation({
    mutationFn: async (formData: Formulário) => {
      const formularioCriado = await createFormulario(formData);
      return formularioCriado;
    },
  });
};
