import {API_PATHS} from "@/constants/paths";
import {api} from "./axios";

let isRefreshing = false;
let waiting: Array<() => void> = [];

export async function refreshAuthToken(): Promise<void> {
  if (isRefreshing) {
    return new Promise((resolve) => waiting.push(resolve));
  }

  isRefreshing = true;

  try {
    await api.post(API_PATHS.auth.refresh);
    waiting.forEach((resolve) => resolve());
    waiting = [];
  } finally {
    isRefreshing = false;
  }
}
