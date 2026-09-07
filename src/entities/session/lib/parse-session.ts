import { z } from "zod";

import type { Session, SessionUser } from "../model/types";

export const sessionUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const sessionSchema = z.object({
  user: sessionUserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export function parseSessionUser(data: unknown): SessionUser {
  return sessionUserSchema.parse(data);
}

export function parseSession(data: unknown): Session {
  return sessionSchema.parse(data);
}
