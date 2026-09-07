export type AuthCredentials = {
  email: string;
  password: string;
};

export type SessionUser = {
  id: string;
  email: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
  refreshToken: string;
};
