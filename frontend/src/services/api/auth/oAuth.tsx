import {api} from "../client/axios";

export const oAuth = async () => {
  try {
    const res = await api.get("/oauth2/authorization/google");
    return res.data;
  } catch {
    return null;
  }
};
