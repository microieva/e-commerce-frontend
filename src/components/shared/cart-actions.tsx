import { FC, useCallback, useEffect, useState, MouseEvent } from 'react';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addItem, removeItem } from '../../redux/app-reducers/cart';
import { Product } from '../../@types/product';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CartItem } from '../../@types/cart';

interface CartActionsProps {
    product: Omit<Product, "categoryId">
    cartDisabled?: boolean,
    children?: JSX.Element
}

const CartActions: FC<CartActionsProps> = ({product, cartDisabled, children}: CartActionsProps) => {
    const cart = useAppSelector(state => state.cart); 
    const [isInCart, setIsInCart] = useState<boolean>(cart.some((item: CartItem) => item._id === product._id))
    const dispatch = useAppDispatch();

    const addToCart = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(addItem(product));
        setIsInCart(true);
    }
    const removeFromCart = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(removeItem(product._id));
      }, [dispatch, product._id]);
    
    useEffect(()=>{
        const inCart = cart.some((item: CartItem) => item._id === product._id);
        if (!inCart) {
            setIsInCart(false)
        }
    }, [isInCart, removeFromCart, product._id, cart]);

    return (
        <div className='btn-group'
            style={{
                float: "right", 
                position: "relative", 
                zIndex:"0",
                cursor: cartDisabled || !isInCart ? 'default' : 'pointer'
            }}
        >
            <IconButton 
                aria-label="add" 
                size="large" 
                disabled={cartDisabled}
                onClick={(e)=>addToCart(e)}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
            <IconButton 
                aria-label="delete" 
                size="large" 
                onClick={removeFromCart} 
                disabled={!isInCart || cartDisabled} 
            >
                <DeleteOutlineIcon />
            </IconButton>
            { children && <>{children}</>}
        </div>
  )
}

export default CartActions;