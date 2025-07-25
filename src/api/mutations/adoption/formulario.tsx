import {Formulário} from "@/api/dtos/formulario.dto";
import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

export const createFormulario = async (data: Formulário) => {
  const res = await api.post(API_PATHS.formulario, data);
  return res.data;
};
