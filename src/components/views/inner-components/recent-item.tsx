import { FC } from "react"
import { CartItem } from "../../../@types/cart"
import CartActions from "../../shared/cart-actions"
import { formatUiPrice } from "../../../shared/formatUiPrice"

interface Props {
    item: CartItem
}

export const RecentItem:FC<Props> = ({item}) => {
    const uiPrice =  formatUiPrice(item.price);
    
    return (
        <>
            <div className='item-price'>{uiPrice} €</div>
            <img src={item.images[0]} alt="product image"/>
            <div className="item-wrapper">
                <div>
                    <h2 className='product-title'>{item.title.toLowerCase()}</h2>
                    {
                        item.category ? 
                        <p className='product-category'>{item.category.name.toLowerCase()}</p>
                        : 
                        <p className='product-category'>-</p>
                    }
                </div>
                <div className="btn-group">
                    <CartActions product={item}/>
                </div>
            </div>
        </>
    )
}