import { api } from "@/api/client/axios";
import { API_PATHS } from "@/constants/paths";

export const refreshToken = async () => {
  try {
    const response = await api.post(API_PATHS.auth.refresh);
    return response.data;
  } catch (error) {
    throw new Error("Refresh token failed");
  }
};
