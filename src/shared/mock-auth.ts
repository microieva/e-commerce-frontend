import { LoginRequest, LoginResponse } from "../@types/auth";
import { User } from "../@types/user";

const mockRequest: LoginRequest = {
  email: 'ieva@email.com',
  password: 'admin',
};

const mockResponse: LoginResponse = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc1MGFlOTU2NmM0NjMzNjRhNmQ3NiIsIm5hbWUiOiJBZG1pbi0yIiwiZW1haWwiOiJhZG1pbi0yQGVtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF2YXRhciI6Imh0dHBzOi8vYXBpLmxvcmVtLnNwYWNlL2ltYWdlL2ZhY2U_dz02NDAmaD00ODAmcj04NjciLCJpYXQiOjE3MDEyNjk2Nzh9.ic4ky4kqsGl4ZOuFGAHn6X5lu7-jB2hZNnYO0qGpZWA"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc1MGFlOTU2NmM0NjMzNjRhNmQ3NiIsIm5hbWUiOiJBZG1pbi0yIiwiZW1haWwiOiJhZG1pbi0yQGVtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF2YXRhciI6Imh0dHBzOi8vYXBpLmxvcmVtLnNwYWNlL2ltYWdlL2ZhY2U_dz02NDAmaD00ODAmcj04NjciLCJpYXQiOjE3MDEyNjk2Nzh9.ic4ky4kqsGl4ZOuFGAHn6X5lu7-jB2hZNnYO0qGpZWA"
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTExY2U4ZmUxNjM4MTRmZjI2YTg1NyIsIm5hbWUiOiJUZXN0IEFkbWluIiwiZW1haWwiOiJ0ZXN0YWRtaW5AZW1haWwuY29tIiwicm9sZSI6IkFETUlOIiwiYXZhdGFyIjoiaHR0cHM6Ly9hcGkubG9yZW0uc3BhY2UvaW1hZ2UvZmFjZT93PTY0MCZoPTQ4MCZyPTg2NyIsImlhdCI6MTcwNTA1NzUxM30.ROlyE0TLFqICWkhoOaokEfewGdcCLxJuzY7Ht1hIeGo"

const mockUser: User = {
  _id: "1",
  email: 'ieva@email.com',
  password: 'admin',
  name: 'Ieva',
  role: "ADMIN",
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
}

export {
  mockRequest,
  mockResponse,
  mockUser,
  token,
  adminToken
};