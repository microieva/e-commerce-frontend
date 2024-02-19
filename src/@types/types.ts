import { ChangeEvent } from "react"

export type ErrorProps = {
  text: string | null,
  height?: string
}

export type LoadingProps = {
  height: string
}

export type SearchBarProps = {
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
}

export type ButtonProps = {
  disabled?: boolean,
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

export type TypeThemeContext = {
  theme: 'light' | 'dark',
  setTheme: () => void
}

export interface Snack {
    message: string,
    open: boolean,
    color?: string
}

export type TypeSnackBarContext = {
  snack: Snack,
  setSnackBar: (snack: Snack) => void
}

export interface Alert {
  text?: string,
  open: boolean,
  action?: string | null
}

export type TypeAlertContext = {
  alertInfo?: Alert,
  setAlert: (alertInfo: Alert) => void,
  isConfirming: string | null,
  //setIsDeleting:(bool: boolean)=> void,
  // isCreating: boolean,
  // setIsCreating:(bool: boolean)=> void,
}
