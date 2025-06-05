import {Formulário} from "@/types/formulario";
import {api} from "../client/axios";

export const createFormulario = async (data: Formulário) => {
  try {
    const res = await api.post("/formulario", data);
    return res.data;
  } catch {
    return null;
  }
};
