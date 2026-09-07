import { getAccessToken } from "@/entities/session";
import { apiClient } from "@/shared/api";

let isAuthHeaderReady = false;

export function setupAuthHeader() {
  if (isAuthHeaderReady) {
    return;
  }

  isAuthHeaderReady = true;

  apiClient.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
}
