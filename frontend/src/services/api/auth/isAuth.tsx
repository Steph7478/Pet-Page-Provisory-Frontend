import {API_PATHS} from "@/constants/paths";
import {api} from "../client/axios";

export const isAuth = async () => {
  try {
    const res = await api.get(API_PATHS.auth.me);
    return res.data;
  } catch {
    return null;
  }
};
