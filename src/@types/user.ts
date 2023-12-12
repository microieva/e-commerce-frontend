export interface User  {
  _id: string,
  email: string,
  password: string,
  name: string,
  role: "ADMIN" | "CUSTOMER",
  avatar: string,
}

export interface UserRequest {
  _id?: string,
  body?: Partial<User>,
  token: string
}