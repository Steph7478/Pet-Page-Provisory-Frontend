import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

export const getPets = async () => {
  const res = await api.get(API_PATHS.pets);
  return res.data;
};

export const getPetsByAdvertiserId = async (ownerId: string) => {
  const res = await api.get(API_PATHS.pets, {
    params: {ownerId},
  });
  return res.data;
};
