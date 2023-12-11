import { Product } from './product';

export interface CartItem extends Omit<Product, "categoryId"> {
  quantity: number
}

export interface OrderRequest {
    body: {
      id: string,
      quantity: number
    }[] | Partial<Order>,
    token: string,
    userId?: string,
    orderId?: string
  }

export interface Order {
  _id: string,
  userId: string,
  totalPrice: number,
  paid: boolean
}