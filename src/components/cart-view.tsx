import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import MuiCartTable from './mui-cart-table';
import { emptyCart } from '../redux/app-reducers/cart';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useCreateOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation } from '../redux/api-queries/order-queries';
import OrderComponent from './order';
import { useAppSelector } from '../hooks/useAppSelector';
import { Error } from '../@types/error'
import { useGetUserQuery } from '../redux/api-queries/auth-queries';

const CartView = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);

    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [ disabled, setDisabled ] = useState<boolean>(Boolean(!localStorage.getItem('token')));
    const [ order, setOrder ] = useState<boolean>(false);

    const [ orderRequestBody, setOrderRequestBody ] = useState<{ id: string, quantity: number}[] | undefined>(undefined);
    const [ createOrder, { data: newOrder, error: newOrderError }] = useCreateOrderMutation();
    const [ updateOrder, { data: updatedOrder, error: updatedOrderError }] = useUpdateOrderMutation();
    const [ deleteOrder, { data: deletedOrder, error: deletingError }] = useDeleteOrderMutation()
    const [ err, setErr ] = useState<Error | undefined>(undefined);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart); 

    const numberOfItems = cart.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0)
    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    const navigate = useNavigate();

    const onEmptyCart = () => {
        dispatch(emptyCart());
    }

    const handleCheckout = async () => {
        if (newOrder) {
            const updates = { paid: true }
            await updateOrder({ token: localStorage.getItem('token') || '', body: updates, orderId: newOrder._id})
        }
    }

    const handleDeleteOrder = async () => {
        if (newOrder) {
            await deleteOrder({orderId: newOrder._id, token})
            setOrder(false);
        }
    }

    useEffect(() => {
        if (deletedOrder) {
            //snackbar deletedOrder.msg
            dispatch(emptyCart());
        }  
    }, [deletedOrder]);

    useEffect(() => {
        if (updatedOrder) {
            dispatch(emptyCart());
        }  
    }, [updatedOrder]);

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }  
        user && setUserId(user._id); 
        setDisabled(Boolean(!token));

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
       
    }, [token]);

    useEffect(()=> {
        if (user?.role === "ADMIN") {
            navigate('/');
        } 
    }, [user])

    useEffect(()=> {
        if (order) {
            if (cart.length !== 0) {
                const arr: { id: string, quantity: number}[] = cart
                    .map((item) => {
                        const orderItem = {id: item._id, quantity: item.quantity}
                        return orderItem
                    })
                arr && setOrderRequestBody(arr)
            }
        }
    }, [order, cart]);

    useEffect(() => {
        const checkout = async() => {   
            if (user && orderRequestBody) {
                await createOrder(
                    { 
                        token: localStorage.getItem('token') || '', 
                        body: orderRequestBody, 
                        userId: user._id
                    }
                );
                setDisabled(true);
            }
        }
        checkout();
        if (newOrderError) {
            setErr(newOrderError as Error);
        }
    }, [orderRequestBody]);

    return (
        <div className="cart-container">
            <div className="view-header">
                {   cart.length === 0 ? 
                    <h2>your cart is empty</h2>
                    :
                    <h2>your cart <span style={{color: "darkgrey"}}>/ {cart.length} {cart.length===1 ? ' product': 'products'}</span></h2>
                }
                <div className="btn-group">
                    <IconButton disabled={disabled} onClick={()=> setOrder(true)}>
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={()=> onEmptyCart()} >
                        <RemoveShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton  onClick={()=> navigate('/')}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>

            </div>
            <MuiCartTable data={cart} disabled={disabled}/>
            {!order &&
                <h2 style={{visibility: cart.length === 0 ? "hidden" : "visible", color: "darkgrey", alignSelf: "flex-end"}}>
                    total amount: {totalAmount} $
                </h2>
            }
            {newOrder && 
                <div style={{visibility: updatedOrder || deletedOrder ? 'hidden' : 'visible', marginTop: "4rem"}}>
                    <OrderComponent 
                        data={newOrder} 
                        handleCheckout={handleCheckout}
                        handleDeleteOrder={handleDeleteOrder}>
                        <div>
                            <h2>your order <span style={{color: "darkgrey"}}>/ {numberOfItems} {numberOfItems>1 ? 'items' : 'item'}</span> </h2>
                            
                        </div> 
                    </OrderComponent>
                </div>
            }
    
            {/* {err && <div><span>ERROR for snackbar api</span></div>}     */}
        </div>    
    )
}

export default CartView;

// 