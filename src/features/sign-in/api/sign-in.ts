import type { AuthCredentials, Session } from "@/entities/session";
import { apiClient } from "@/shared/api";

export async function signIn(body: AuthCredentials) {
  const { data } = await apiClient.post<Session>("/auth/sign-in", body);
  return data;
}
