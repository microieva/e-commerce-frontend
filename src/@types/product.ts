export interface Product {
  _id: string,
  title: string,
  price: number,
  description: string
  category: Category,
  images: string[],
  categoryId: string,
}

export interface Category {
  _id: string,
  name: string,
  image: string,
}

export interface ProductRequest {
  productId?: string,
  body?: Partial<Product>,
  token: string
}

export interface CategoryRequest {
  categoryId?: string,
  body?: Partial<Product>,
  token: string
}