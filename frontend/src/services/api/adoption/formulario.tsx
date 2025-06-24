import {Formulário} from "@/types/formulario";
import {api} from "../client/axios";
import {API_PATHS} from "@/constants/paths";

export const getFormulario = async (id: string) => {
  const res = await api.get(`${API_PATHS.formulario}/${id}`);
  return res.data;
};

export const createFormulario = async (data: Formulário) => {
  try {
    const res = await api.post(API_PATHS.formulario, data);
    return res.data;
  } catch {
    return null;
  }
};

export const deleteFormulario = async (id: string) => {
  try {
    const res = await api.delete(`${API_PATHS.formulario}/${id}`);
    return res.data;
  } catch {
    return null;
  }
};
