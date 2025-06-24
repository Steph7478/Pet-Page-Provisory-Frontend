import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

export const getFormulario = async (id: string) => {
  const res = await api.get(`${API_PATHS.formulario}/${id}`);
  return res.data;
};
