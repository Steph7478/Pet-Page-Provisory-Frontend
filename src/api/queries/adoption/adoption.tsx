import {API_PATHS} from "@/constants/paths";
import {api} from "../../client/axios";

export const getAdoptionByClientId = async (clientId: string) => {
  const {data} = await api.get(`${API_PATHS.adocoes}`, {
    params: {clientId},
  });
  return data;
};
