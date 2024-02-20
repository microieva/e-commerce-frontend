
import { useEffect, useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteOrderMutation, useDeleteUserOrdersMutation } from '../../../redux/api-queries/order-queries';
import { useGetUserQuery } from '../../../redux/api-queries/auth-queries';
import { SnackBarContext } from '../../../contexts/snackbar';
import { AlertContext } from '../../../contexts/alert';
import OrderComponent from '../../shared/order';
import { TypeAlertContext, TypeSnackBarContext } from '../../../@types/types';
import { Order } from '../../../@types/cart';

interface Props {
    orders: Order[],
    admin?:boolean
}

const Orders = ({ orders, admin }: Props) => {
    const [ deleteUserOrders, { data: deleteUserOrdersData, error: deleteUserOrdersError, isLoading}] = useDeleteUserOrdersMutation();
    const { data: user } = useGetUserQuery(localStorage.getItem('token') || '');
    const [ orderId, setOrderId ] = useState<string | null>(null);
    const [ deleteOrder, { data, error }] = useDeleteOrderMutation();
    const [ lastOrder, setLastOrder ] = useState<boolean>(false);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const navigate = useNavigate();

    useEffect(()=> {
        const onDeletingAllOrders = async()=> {
            if (user?._id) {
                try {
                    await deleteUserOrders({userId: user._id, token: localStorage.getItem('token') || ''});
                    setSnackBar({message: "Orders deleted successfuly", open: true});
                    setAlert({open: false, action: null});
                    setLastOrder(true);
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        const onDeletingOrder = async()=> {
            if (orderId) { 
                try {
                    await deleteOrder({orderId, token: localStorage.getItem('token') || ''});
                    setSnackBar({message: "Deleted successfuly", open: true});
                    setAlert({open: false, action: null});
                    if (orders.length === 1) {
                        setLastOrder(true);
                    }  
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }   
            }
        }
        if (isConfirming === "isDeletingAllOrders") {
            onDeletingAllOrders();
        } else if (isConfirming === "isDeleting") {
            onDeletingOrder();
        }
    }, [isConfirming])

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setAlert({text: "Delete all orders from the system?", open: true, action: "isDeletingAllOrders"})
    }

    useEffect(()=> {
        navigate('/auth/profile');
    }, [data, deleteUserOrdersData])

    return (
        <>
            {!lastOrder &&<>
                <Divider />
                <div className='view-header' style={{marginTop: "6rem"}}>
                    <h2>orders</h2>
                    <div className='btn-group'>
                        <IconButton onClick={(e)=>onDelete(e)}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div> 
                </div> 
                <div className="profile-section">
                        {orders.map((order, i )=> {
                            if (order.paid) {
                                return <OrderComponent 
                                            key={i}
                                            order={order} 
                                            setOrderId={setOrderId}
                                        >
                                            {admin ? <h2>user's order</h2> : <h2>your order</h2>}  
                                        </OrderComponent>
                        }
                        })}
                    </div>    
            </>}
        </>
    )
}  

export default Orders;

