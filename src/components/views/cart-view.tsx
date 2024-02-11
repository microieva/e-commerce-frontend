import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Backdrop, Dialog, IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import MuiCartTable from '../tables/mui-cart-table';
import { emptyCart } from '../../redux/app-reducers/cart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { 
    useCreateOrderMutation, 
    useDeleteOrderMutation, 
    useUpdateOrderMutation 
} from '../../redux/api-queries/order-queries';
import OrderComponent from '../shared/order';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Error } from '../../@types/error'
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import Loading from '../shared/loading';
import { formatUiPrice } from '../../shared/formatUiPrice';
import Alert from '../shared/alert';
import { TypeForm } from '../../@types/types';
import FormProvider from '../../contexts/form';
import FormSwitcher from './inner-components/form-switcher';

const CartView = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery(token);

    const cart = useAppSelector(state => state.cart); 
    const [ disabled, setDisabled ] = useState<boolean>(Boolean(cart.length === 0));
    const [ order, setOrder ] = useState<boolean>(false);

    const [ orderRequestBody, setOrderRequestBody ] = useState<{ id: string, quantity: number}[] | undefined>(undefined);
    const [ createOrder, { data: newOrder, error: newOrderError, isLoading: isLoadingNewOrder }] = useCreateOrderMutation();
    const [ updateOrder, { data: updatedOrder, error: updatedOrderError, isLoading: isLoadingUpdatedOrder }] = useUpdateOrderMutation();
    const [ deleteOrder, { data: deletedOrder, error: deletingError, isLoading: isDeletingOrder }] = useDeleteOrderMutation();
    const [loading, setLoading] = useState<boolean>(isLoadingUser || isLoadingNewOrder || isLoadingUpdatedOrder || isDeletingOrder);
    const [ err, setErr ] = useState<Error | undefined>(undefined);
    const [ showAlert, setShowAlert ] = useState<boolean>(false);
    const [ openForm, setOpenForm ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const dispatch = useAppDispatch();

    const numberOfItems = cart.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0)
    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);
    const iuTotalAmount = formatUiPrice(totalAmount);
    const navigate = useNavigate();

    const onEmptyCart = () => {
        dispatch(emptyCart());
    }

    const onCreateOrder = () => {
        if (user) {
            setOrder(true);
        } else {
            setShowAlert(true);
        }
    }

    const handleCheckout = async () => {
        if (newOrder) {
            const updates = { paid: true }
            await updateOrder({ token: localStorage.getItem('token') || '', body: updates, orderId: newOrder._id});
            setLoading(isLoadingNewOrder);
            setOrder(false);
            dispatch(emptyCart());
        }
    }

    const handleDeleteOrder = async () => {
        if (newOrder) {
            await deleteOrder({orderId: newOrder._id, token})
            setOrder(false);
            setLoading(isDeletingOrder);
            setDisabled(false);
        }
    }

    useEffect(() => {
        if (updatedOrder) {
            dispatch(emptyCart());
        }  
    }, [updatedOrder]);

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        } 

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
       
    }, [token]);

    useEffect(()=> {
        setLoading(isLoadingUser);
        cart.length === 0 && setDisabled(true);
        if (user?.role === "ADMIN") {
            navigate('/');
        } 
    }, [user])

    useEffect(()=> {
        cart.length === 0 && setDisabled(true);
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
                setLoading(isLoadingNewOrder);
            }
        }
        checkout();
        if (newOrderError) {
            setErr(newOrderError as Error);
        }
    }, [orderRequestBody]);

    const handleClose = () => {
        showAlert && setShowAlert(false);
        openForm && setOpenForm(false);

    }
    const handleConfirm = () => {
        setForm('login');
        setShowAlert(false);
        setOpenForm(true);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="view-wrapper">
            <div className="view-header">
                {   cart.length === 0 ? 
                    <h2>your cart is empty</h2>
                    :
                    <h2>your cart <span style={{color: "darkgrey"}}>/ {cart.length} {cart.length===1 ? ' product': 'products'}</span></h2>
                }
                <div className="btn-group">
                    <IconButton disabled={disabled} onClick={()=> onCreateOrder()}>
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    <IconButton disabled={disabled} onClick={()=> onEmptyCart()} >
                        <RemoveShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton  onClick={()=> navigate('/')}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>

            </div>
            <div className="table-view">
                <MuiCartTable data={cart} disabled={disabled}/>
            </div>
            {!order &&
                <h2 style={{visibility: cart.length === 0 ? "hidden" : "visible", color: "darkgrey", alignSelf: "flex-end"}}>
                    total amount: {iuTotalAmount} €
                </h2>
            }
            {order && newOrder && 
                <div style={{marginTop: "4rem"}}>
                    <OrderComponent 
                        order={newOrder} 
                        handleCheckout={handleCheckout}
                        handleDeleteOrder={handleDeleteOrder}>

                        <h2>your order <span style={{color: "darkgrey"}}>/ {numberOfItems} {numberOfItems>1 ? 'items' : 'item'}</span> </h2>   
                    </OrderComponent>
                </div>
            }
            { showAlert &&
                <>
                    <Dialog fullWidth open={showAlert} onClose={handleClose} >
                        <Alert 
                            text={'signup or login to order'}
                            handleCancel={handleClose} 
                            handleConfirm={handleConfirm}
                        />
                    </Dialog>
                    <Backdrop open={showAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                    <Outlet />
                </>
            }
            <>
                <FormProvider form={form} onClose={handleClose}>
                    <Dialog fullWidth open={openForm} onClose={handleClose} >
                        <FormSwitcher />
                    </Dialog>
                    <Backdrop open={openForm} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                </FormProvider>
                <Outlet />
            </>
        </div>
    )
}

export default CartView;