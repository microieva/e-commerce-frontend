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
    <>
      <div className='product-price'>{uiPrice} €</div>
      <div className="card-wrapper">
          <img src={product.images[0]} alt="product image"/>
          <div className="card-content">
            <div>
              <p className='product-title'>{product.title.toLowerCase()}</p>
              {
                product.category ? 
                  <p className='product-category'>{product.category.name.toLowerCase()}</p>
                  : 
                  <p className='product-category'>
                    {admin ? <em>Deleted category</em>: "-"}
                  </p>
              }
            </div>
              { !admin ? <CartActions product={product}/> : <AdminActions product={product}/>}
          </div>
      </div>
    </>
  )
}

export default ProductCard;