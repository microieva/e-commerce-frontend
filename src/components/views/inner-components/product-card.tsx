import { FC } from 'react';

import { Product } from '../../../@types/product';
import CartActions from '../../shared/cart-actions';
import AdminActions from '../../shared/admin-actions';
import { formatUiPrice } from '../../../shared/formatUiPrice';

interface CardProps {
    product: Omit<Product, 'categoryId'>,
    admin: boolean
}

const ProductCard: FC<CardProps> = ({ product, admin }: CardProps) => {
  const uiPrice =  formatUiPrice(product.price);
  return (
    <div className="card-wrapper">
        <img src={product.images[0]} alt=""/>
        <div className="card-content">
            <div className='product-price'>{uiPrice} €</div>
            <p className='product-title'>{product.title}</p>
            <p className='product-category'>{product.category.name}</p>
            { !admin ? <CartActions product={product}/> : <AdminActions product={product}/>}
        </div>
    </div>
  )
}

export default ProductCard;