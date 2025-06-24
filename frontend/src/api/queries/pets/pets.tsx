import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

export const getPets = async () => {
  const res = await api.get(API_PATHS.pets);
  return res.data;
};

export const getPetById = async (id: string) => {
  const res = await api.get(`${API_PATHS.pets}/${id}`);
  return res.data;
};

export const getPetsByAdvertiserId = async (owner: string) => {
  const res = await api.get(API_PATHS.pets, {
    params: {owner},
  });
  return res.data;
};
