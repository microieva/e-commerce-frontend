import { FC, useEffect, useState } from 'react';

import { Product } from '../@types/product';
import CartActions from './cart-actions';
import { useGetCategoryByIdQuery } from '../redux/api-queries/category-queries';

interface CardProps {
    product: Omit<Product, 'categoryId'>
}

const ProductCard: FC<CardProps> = ({ product }: CardProps) => {
  //const { user } = useContext(UserContext) as TypeUserContext;
  //const { data: category } = useGetCategoryByIdQuery(product.categoryId)
  const user = null
  const [ admin, setAdmin ] = useState<boolean>(false);

  useEffect(()=> {
    //user && user.role === 'ADMIN' ? setAdmin(true) : setAdmin(false);
}, [user]);
  return (
    <div className="card-wrapper">
        <img src={product.images[0]} alt=""/>
        <div className="card-content">
            <div className='product-price'>{product.price}</div>
            <p className='product-title'>{product.title}</p>
            <p className='product-category'>{product.category.name}</p>
            { (!user || !admin) ? <CartActions product={product}/> : <div className='placeholder'/>}
        </div>
    </div>
  )
}

export default ProductCard;