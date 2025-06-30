import { api } from "@/api/client/axios";
import { API_PATHS } from "@/constants/paths";

export const setAccessToken = (token: string): void => {
    localStorage.setItem("access_token", token);
};

export const getAccessToken = (): string | null => {
    return typeof localStorage === "object" ? localStorage.getItem("access_token") : null;
};

export const removeAccessToken = (): void => {
    if (getAccessToken() !== null) localStorage.removeItem("access_token");
}

export const getNewRefreshToken = async (): Promise<{ token: string }> => {
    const { data } = await api.post(API_PATHS.auth.refresh, {
        token: getAccessToken()
    });
    return data
}