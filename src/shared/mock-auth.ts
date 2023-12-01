import { LoginRequest, LoginResponse } from "../@types/auth";
import { User } from "../@types/user";

const mockRequest: LoginRequest = {
  email: 'ieva@email.com',
  password: 'admin',
};

const mockResponse: LoginResponse = {
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw"
}

const mockUser: User = {
  id: 1,
  email: 'ieva@email.com',
  password: 'admin',
  name: 'Ieva',
  role: "admin",
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
}

export {
  mockRequest,
  mockResponse,
  mockUser
};