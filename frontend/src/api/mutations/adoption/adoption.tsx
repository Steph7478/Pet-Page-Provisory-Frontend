import {API_PATHS} from "@/constants/paths";
import {api} from "../../client/axios";

export const updateAdoption = async (
  clientId: string,
  data: {id: string[]}
) => {
  const res = await api.patch(`${API_PATHS.adocoes}/${clientId}`, data);
  return res.data;
};
