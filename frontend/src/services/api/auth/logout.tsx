import {API_PATHS} from "@/constants/paths";
import {api} from "../client/axios";

export const logout = async () => {
  const res = await api.get(API_PATHS.auth.logout);
  return res.data;
};
