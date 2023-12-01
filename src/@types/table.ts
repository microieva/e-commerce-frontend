import { FontStyle } from "@mui/material/styles/createTypography";
import { Product } from "./product";
import { CartItem } from "./cart";

export interface TableColumn {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category',
  label: string,
  minWidth?: number,
  align?: 'right',
  render?: (row: Product) => string,
}
export interface CartColumn {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category' | 'quantity',
  label: string,
  minWidth?: number,
  align?: 'right',
  render?: (row: CartItem) => string,
}
