import { Product } from './product';

export interface CartItem extends Omit<Product, "categoryId"> {
  quantity: number
}