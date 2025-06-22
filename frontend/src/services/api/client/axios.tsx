import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// interceptor 401 → refresh ----------
api.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {

        const original = error.config as AxiosRequestConfig & { __isRetry?: boolean };

        if (error.response?.status === 401 && !original.__isRetry) {
            original.__isRetry = true;

            try {
                await api.post("/auth/refresh");   // renova cookies
                return api(original);              // repete requisição
            } catch {
                // refresh falhou → redireciona login
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);

