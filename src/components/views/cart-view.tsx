import { useContext, useEffect, useState } from 'react';
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
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import { formatUiPrice } from '../../shared/formatUiPrice';
import { AlertContext } from '../../contexts/alert';
import { SnackBarContext } from '../../contexts/snackbar';
import OrderComponent from '../shared/order';
import Loading from '../shared/loading';
import FormProvider from '../../contexts/form';
import FormSwitcher from './inner-components/form-switcher';
import { TypeAlertContext, TypeForm, TypeSnackBarContext } from '../../@types/types';
import { Order } from '../../@types/cart';

const CartView = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery(token);
    const cart = useAppSelector(state => state.cart); 
    
    const [ orderRequestBody, setOrderRequestBody ] = useState<{ id: string, quantity: number}[] | undefined>(undefined);
    const [ createOrder, { data: newOrderData, error: newOrderError, isLoading: isLoadingNewOrder }] = useCreateOrderMutation();
    const [ updateOrder, { data: updatedOrder, error: updatedOrderError, isLoading: isLoadingUpdatedOrder }] = useUpdateOrderMutation();
    const [ deleteOrder, { data: deletedOrder, error: deletingError, isLoading: isDeletingOrder }] = useDeleteOrderMutation();
    const [loading, setLoading] = useState<boolean>(isLoadingUser || isLoadingNewOrder || isLoadingUpdatedOrder || isDeletingOrder);
    const [ newOrder, setNewOrder ] = useState<Order | undefined>(newOrderData);
    const [ disabled, setDisabled ] = useState<boolean>(Boolean(cart.length === 0));
    
    const [ openForm, setOpenForm ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
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

    const handleCreateOrder = () => {
        if (token) {
            const arr: { id: string, quantity: number}[] = cart
                .map((item) => {
                    const orderItem = {id: item._id, quantity: item.quantity}
                    return orderItem
                });
            arr && setOrderRequestBody(arr);
        } else {
            setAlert({text: "Please signup or login to order", open: true, action: "isCreating"});
        }
    }

    useEffect(() => {
        const onIsCreating = async() => {   
            if (user && orderRequestBody) {
                try {
                    await createOrder(
                        { 
                            token: localStorage.getItem('token') || '', 
                            body: orderRequestBody, 
                            userId: user._id
                        }
                    );
                    setLoading(isLoadingNewOrder);
                } catch (error) {
                    setSnackBar({message:error as string, open: true});
                }
            }
        }
        onIsCreating();
    }, [orderRequestBody]);

    useEffect(()=> {
        newOrderData && setNewOrder(newOrderData);
    }, [newOrderData]);

    const handleCheckout = async() => {
        if (newOrder) {
            const updates = { paid: true }
            try {
                await updateOrder({ token: localStorage.getItem('token') || '', body: updates, orderId: newOrder._id});
                setLoading(isLoadingNewOrder);
                setSnackBar({message: "Thank you for shopping! ", open: true});
                setNewOrder(undefined);
                dispatch(emptyCart());
            } catch (error) {
                setSnackBar({message: error as string, open: true});
            }
        }
    }

    useEffect(()=> {  
        const onConfirmLogin = async () => {
            if (!token) {
                setAlert({open: false, action:''});
                setForm('login');
                setOpenForm(true);
            }
        }
        if (isConfirming === "isCreating") {
            onConfirmLogin();
        } 
    }, [isConfirming]);

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
        if (!token && newOrder) {
            setNewOrder(undefined);
        }
        return () => window.removeEventListener('storage', handleStorage)
    }, [token]);

    useEffect(()=> {
        setLoading(isLoadingUser);
        cart.length === 0 && setDisabled(true);
        if (user?.role === "ADMIN") {
            navigate('/');
        } 
    }, [user]);

   useEffect(()=> {
        if (newOrder || cart.length === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [newOrder, cart]);

    const handleClose = () => {
        openForm && setOpenForm(false);
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
                    <IconButton disabled={disabled} onClick={()=>handleCreateOrder()}>
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
            {!newOrder &&
                <h2 style={{visibility: cart.length === 0 ? "hidden" : "visible", color: "darkgrey", alignSelf: "flex-end"}}>
                    total amount: {iuTotalAmount} €
                </h2>
            } 
            <div style={{marginTop: "4rem"}}>
                { loading && <Loading />}
                {newOrder &&
                        <OrderComponent 
                            order={newOrder} 
                            handleCheckout={handleCheckout}
                            setOrder={setNewOrder}
                        >
                            <h2>your order <span style={{color: "darkgrey"}}>/ {numberOfItems} {numberOfItems>1 ? 'items' : 'item'}</span> </h2>   
                        </OrderComponent>
                }
            </div>
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