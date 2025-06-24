import {PetInfos} from "@/types/pet";
import {api} from "../client/axios";
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

export const updatePet = async (id: string, data: {status: string}) => {
  const res = await api.patch(`${API_PATHS.pets}/${id}`, data);
  return res.data;
};

export const registerPet = async (data: PetInfos) => {
  try {
    const res = await api.post(API_PATHS.pets, data);
    return res.data;
  } catch {
    return null;
  }
};
