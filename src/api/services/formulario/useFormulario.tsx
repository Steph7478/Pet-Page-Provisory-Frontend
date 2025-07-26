import {createFormulario} from "@/api/mutations/adoption/formulario";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Formulário} from "@/api/dtos/formulario.dto";
import {getFormulario} from "@/api/queries/adoption/formulario";
import router from "next/router";

export const useFormularioByPetId = (petId: string) => {
  return useQuery<Formulário | undefined>({
    queryKey: ["formulario", petId],
    queryFn: async () => {
      const res = await getFormulario(petId);
      return Array.isArray(res) ? res[0] : res;
    },
    enabled: !!petId,
  });
};

export const useFormulario = () => {
  return useMutation({
    mutationFn: async (formData: Formulário) => {
      return await createFormulario(formData);
    },
    onSuccess: () => {
      router.push("/adotar");
    },
  });
};
