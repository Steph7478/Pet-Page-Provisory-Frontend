import {api} from "./axios";

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

export async function refreshAuthToken(): Promise<void> {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      await api.post("/auth/refresh");
      failedQueue.forEach((cb) => cb());
      failedQueue = [];
    } catch {
      failedQueue = [];
    } finally {
      isRefreshing = false;
    }
  } else {
    await new Promise<void>((resolve) => failedQueue.push(resolve));
  }
}
