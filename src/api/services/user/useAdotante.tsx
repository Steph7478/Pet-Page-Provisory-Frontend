import {Formulário} from "@/api/dtos/formulario.dto";
import {getFormularioByClient} from "@/api/queries/adoption/formulario";
import {useQuery} from "@tanstack/react-query";

export const useFormularioByClientId = (clientId: string) => {
  return useQuery<Formulário | undefined>({
    queryKey: ["formulario", clientId],
    queryFn: async () => {
      const res = await getFormularioByClient(clientId);
      return Array.isArray(res) ? res[0] : res;
    },
    enabled: !!clientId,
  });
};
