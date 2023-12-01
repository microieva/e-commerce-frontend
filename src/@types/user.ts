export interface User  {
  id: number,
  email: string,
  password: string,
  name: string,
  role: "admin" | "customer",
  avatar: string,
}