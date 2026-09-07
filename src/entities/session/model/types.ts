export type AuthCredentials = {
  email: string;
  password: string;
};

export type SessionUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
  refreshToken: string;
};
