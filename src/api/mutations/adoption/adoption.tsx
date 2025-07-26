import {API_PATHS} from "@/constants/paths";
import {api} from "../../client/axios";

export const approveAdoption = async (data: {
  id: string;
  clientId: string;
  dataAdocao: string;
}) => {
  const res = await api.post(`${API_PATHS.adocoes}/approve`, data);
  return res.data;
};

export const rejectAdoption = async (data: {id: string; clientId?: string}) => {
  const res = await api.post(`${API_PATHS.adocoes}/reject`, data);
  return res.data;
};

export const cancelAdoption = async (data: {id: string; clientId?: string}) => {
  const res = await api.post(`${API_PATHS.adocoes}/cancel`, data);
  return res.data;
};
