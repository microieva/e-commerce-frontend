import { FC } from "react"
import { CartItem } from "../../../@types/cart"
import CartActions from "../../shared/cart-actions"
import { formatUiPrice } from "../../../shared/formatUiPrice"
import { Product } from "../../../@types/product"

interface Props {
    item: CartItem | Product
}

export const RecentItem:FC<Props> = ({item}) => {
    const uiPrice =  formatUiPrice(item.price);
    
    return (
        <>
            <div className='item-price'>{uiPrice} €</div>
            <img src={item.images[0]} alt="product image"/>
            <div className="item-wrapper">
                <div className="item-text">
                    <h1 className='product-title'>{item.title.toLowerCase()}</h1>
                    {
                        item.category ? 
                        <h4 className='product-category'>{item.category.name.toLowerCase()}</h4>
                        : 
                        <h4 className='product-category'>-</h4>
                    }
                </div>
                <div className="btn-group">
                    <CartActions product={item}/>
                </div>
            </div>
        </>
    )
}