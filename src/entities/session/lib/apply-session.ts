import type { QueryClient } from "@tanstack/react-query";

import { SESSION_QUERY_KEY } from "../model/session-query";
import type { Session } from "../model/types";
import { clearTokens, saveTokens } from "./token-storage";

export function applySession(queryClient: QueryClient, session: Session) {
  saveTokens(session);
  queryClient.setQueryData(SESSION_QUERY_KEY, session.user);
}

export function resetSession(queryClient: QueryClient) {
  clearTokens();
  queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY });
}
