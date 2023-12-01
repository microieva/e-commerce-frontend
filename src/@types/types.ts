import { ChangeEvent } from "react"
import { LoginResponse } from "./auth"
import { Product } from "./product"
import { User } from "./user"

export type ErrorProps = {
  text: string | null,
  height?: string
}

export type LoadingProps = {
  height: string
}

export type SearchBarProps = {
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,
}

export type ButtonProps = {
  text: string,
  width?: string,
  height?: string,
  onClick: ()=>void
}

export type TypeForm = 'signup' | 'login' | null;

export type TypeFormContext = {
  form?: TypeForm,
  onClose: ()=> void,
}

export type TypeUserContext = {
  user: User | undefined,
  onLogout: ()=> void,
  onLogin: ()=> void
}
