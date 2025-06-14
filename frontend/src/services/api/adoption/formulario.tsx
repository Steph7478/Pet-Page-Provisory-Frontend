import {Formulário} from "@/types/formulario";
import {api} from "../client/axios";

export const getFormulario = async (id: string) => {
  const res = await api.get(`/formulario/${id}`);
  return res.data;
};

export const createFormulario = async (data: Formulário) => {
  try {
    const res = await api.post("/formulario", data);
    return res.data;
  } catch {
    return null;
  }
};

export const deleteFormulario = async (id: string) => {
  try {
    const res = await api.delete(`/formulario/${id}`);
    return res.data;
  } catch {
    return null;
  }
};
