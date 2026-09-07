import type { AuthCredentials, Session } from "@/entities/session";
import { apiClient } from "@/shared/api";

export async function signUp(body: AuthCredentials) {
  const { data } = await apiClient.post<Session>("/auth/sign-up", body);
  return data;
}
