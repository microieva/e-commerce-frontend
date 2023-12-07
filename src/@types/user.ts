export interface User  {
  id: string,
  email: string,
  password: string,
  name: string,
  role: "ADMIN" | "CUSTOMER",
  avatar: string,
}