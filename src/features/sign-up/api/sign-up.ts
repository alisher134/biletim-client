import { parseSession, type AuthCredentials } from "@/entities/session";
import { apiClient } from "@/shared/api";

export async function signUp(body: AuthCredentials) {
  const { data } = await apiClient.post("/auth/sign-up", body);
  return parseSession(data);
}
