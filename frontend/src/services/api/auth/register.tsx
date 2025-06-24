import {SignUpData} from "@/types/auth";
import {api} from "../client/axios";
import {API_PATHS} from "@/constants/paths";

export const createUser = async (data: SignUpData) => {
  const res = await api.post(API_PATHS.auth.register, data);
  return res.data;
};
