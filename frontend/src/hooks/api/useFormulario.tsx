import {
  createFormulario,
  getFormulario,
} from "@/services/api/adoption/formulario";
import {updatePet} from "@/services/api/pets";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Formulário} from "@/types/formulario";

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

      if (formularioCriado && formData.id) {
        await updatePet(formData.id, {status: "Pendente"});
      }

      return formularioCriado;
    },
  });
};
