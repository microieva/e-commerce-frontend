import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import MuiCartTable from './mui-cart-table';
import { CartItem } from '../@types/cart';
import { emptyCart } from '../redux/app-reducers/cart';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface Props {
  cart: CartItem[]
}

const CartView: FC<Props> = ({ cart }) => {
    const [ data, setData ] = useState<CartItem[] | undefined>(cart);
    const dispatch = useAppDispatch();
    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    useEffect(()=> {
        setData(cart)
    }, [cart]);

    const goBack = useNavigate();

    const onEmptyCart = () => {
        dispatch(emptyCart());
    }
    const onCheckout = () => {
        if (cart.length !== 0) {
            dispatch(emptyCart());
            alert("Thank you for shopping with us!");
            goBack('/');
        } else {
            alert("Cart is empty");
        }
    }

    return (
        <div className="cart-container" >
            <div className="view-header">
                {   cart.length === 0 ? 
                    <h2>your cart is empty</h2>
                    :
                    <h2>your cart <span style={{color: "darkgrey"}}>/ {cart.length} {cart.length===1 ? ' product': 'products'}</span></h2>
                }
                <div className="btn-group">
                    <IconButton onClick={()=> onCheckout()}>
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={()=> onEmptyCart()} >
                        <RemoveShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton  onClick={()=> goBack('/')}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>

            </div>
            <MuiCartTable data={cart} />
            <h2 style={{visibility: cart.length === 0 ? "hidden" : "visible", color: "darkgrey", alignSelf: "flex-end"}}>
                total amount: {totalAmount} $
            </h2>
        </div>
        
    )
}

export default CartView;