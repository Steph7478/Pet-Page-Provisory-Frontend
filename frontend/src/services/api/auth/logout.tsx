import {api} from "../client/axios";

export const logout = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};
