import {api} from "../client/axios";

export const isAuth = async () => {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch {
    return null;
  }
};
