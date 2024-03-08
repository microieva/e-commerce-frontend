import { FC } from 'react';
import CartActions from '../../shared/cart-actions';
import AdminActions from '../../shared/admin-actions';
import { formatUiPrice } from '../../../shared/formatUiPrice';
import { Product } from '../../../@types/product';

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
          <div className="item-wrapper">
            <div className='item-text'>
              <h2 className='product-title'>{product.title.toLowerCase()}</h2>
              {
                product.category ? 
                  <h4 className='product-category'>{product.category.name.toLowerCase()}</h4>
                  : 
                  <h4 className='product-category'>
                    {admin ? <em>Deleted category</em>: "-"}
                  </h4>
              }
            </div>
              { !admin ? <CartActions product={product}/> : <AdminActions product={product}/>}
          </div>
      </div>
    </>
  )
}

export default ProductCard;