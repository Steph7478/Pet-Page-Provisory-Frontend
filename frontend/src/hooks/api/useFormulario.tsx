import {createFormulario} from "@/services/api/formulario";
import {useMutation} from "@tanstack/react-query";

export const useFormulario = () => {
  return useMutation({
    mutationFn: createFormulario,
  });
};
