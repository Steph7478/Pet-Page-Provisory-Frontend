import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

export const getFormulario = async (petId: string) => {
  const res = await api.get(`${API_PATHS.formulario}`, {
    params: {petId},
  });
  return res.data;
};
