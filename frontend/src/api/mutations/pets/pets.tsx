import {PetInfos} from "@/api/dtos/pet.dto";
import {api} from "../../client/axios";
import {API_PATHS} from "@/constants/paths";

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
