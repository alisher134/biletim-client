import type { Session } from "../model/types";

const ACCESS_TOKEN_KEY = "tarih:accessToken";
const REFRESH_TOKEN_KEY = "tarih:refreshToken";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function saveTokens(session: Session) {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
}

export function clearTokens() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
