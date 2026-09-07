import { isAxiosError } from "axios";

import { apiClient } from "@/shared/api";

import { parseSessionUser } from "../lib/parse-session";
import { clearTokens } from "../lib/token-storage";

export async function getMe() {
  try {
    const { data } = await apiClient.get("/auth/me");
    return parseSessionUser(data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      clearTokens();
    }

    throw error;
  }
}
