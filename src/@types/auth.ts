export type LoginRequest = {
  email: string | undefined,
  password: string | undefined,
};

export type LoginResponse = {
  token: string,
};