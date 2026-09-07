import { isAxiosError } from "axios";

import { apiClient } from "@/shared/api";

import { clearTokens } from "../lib/token-storage";
import type { SessionUser } from "../model/types";

export async function getMe() {
  try {
    const { data } = await apiClient.get<SessionUser>("/auth/me");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      clearTokens();
    }

    throw error;
  }
}
