import { useContext, useEffect, useState, MouseEvent } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import { useDeleteOrderMutation } from '../../redux/api-queries/order-queries';
import { useUiDate } from '../../hooks/useUiDate';
import { formatUiPrice } from '../../shared/formatUiPrice';
import OrderItems from './order-items';
import { AlertContext } from '../../contexts/alert';
import { SnackBarContext } from '../../contexts/snackbar';
import { TypeAlertContext, TypeSnackBarContext } from '../../@types/types';
import { Order } from '../../@types/cart';

interface Props {
    order: Order,
    children: React.JSX.Element,
    setOrder?: (arg: undefined)=> void,
    setOrderId?: (id: string) => void,
    handleCheckout?: () => void,
    handleOpenItems?: () => Promise<void>
}

const OrderComponent = ({ order, children, handleCheckout, setOrder, setOrderId }: Props) => {
    const [ deleteOrder, { data: deletedOrder, error: deletingError, isLoading: isDeletingOrder }] = useDeleteOrderMutation();
    const [ open, setOpen ] = useState<boolean>(false);
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    
    const uiPrice = formatUiPrice(order.totalPrice);
    const uiDate = useUiDate(order.createdAt);
    const token = localStorage.getItem('token') || '';

    const handleOpen = () => {
        if (order.paid && !open) {
            setOpen(true);
        } else if (order.paid && open) {
            setOpen(false);
        }
    }

    const handleDeleteOrder = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        setIsDeleting(true);
        setOrderId && setOrderId(order._id);
        setAlert({text:"Delete this order?", open: true, action: "isDeleting"});
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(()=> {
        const onConfirmDelete = async () => {
            if (isDeleting) {
                try {
                    await deleteOrder({orderId: order._id, token});
                    setAlert({open: false, action: null});
                    setOrder && setOrder(undefined);
                    setSnackBar({message: "Order deleted", open: true});   
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
                setIsDeleting(false);
            }
        }
        if (isConfirming === "isDeleting") {   
            onConfirmDelete();
        }
    }, [isConfirming]);
    
    return (
            <div 
                className="flex-container"
                id={open ? "open" : ""}    
            >
                <div className={order?.paid ? "view-header hover": "view-header"} onClick={()=> handleOpen()}>

                    <div>
                        {children}   
                        <h2 style={{color: "darkgrey", fontSize:"18px"}}>{uiDate}</h2> 
                    </div>
                    <div>  
                        <h2 style={{color: "darkgrey"}}>
                            total price: {uiPrice} €
                        </h2>    
                        {order && 
                            <div className="btn-group">
                                {!order.paid &&
                                <>
                                    <IconButton  onClick={handleCheckout}>
                                        <PaymentIcon/>
                                    </IconButton>
                                    <IconButton  onClick={(e)=>handleDeleteOrder(e)}>
                                        <RemoveShoppingCartIcon/>
                                    </IconButton>
                                </>}
                                {order.paid && <IconButton  onClick={(e)=>handleDeleteOrder(e)}>
                                    <DeleteOutlineIcon/>
                                </IconButton>}
                            </div>
                        }
                            
                    </div>
                </div>
                { open && order && <OrderItems orderId={order._id} handleClose={handleClose}/> }
            </div>
    )
}  


export default OrderComponent;

