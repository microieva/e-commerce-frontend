import { Product } from './product';

export interface CartItem extends Omit<Product, "categoryId"> {
  quantity: number
}

export interface OrderRequest {
    body: {
      id: string,
      quantity: number
    }[],
    token: string,
    userId: string
  }

export interface Order {
  _id: string,
  userId: string,
  totalPrice: number
}