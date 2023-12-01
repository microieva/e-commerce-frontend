export type LoginRequest = {
  email: string | undefined,
  password: string | undefined,
};

export type LoginResponse = {
  access_token: string,
  refresh_token: string,
};