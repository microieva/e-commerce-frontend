
import { useEffect, useState, MouseEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, Dialog, Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../../../@types/cart';
import OrderComponent from '../../shared/order';
import { useDeleteOrderMutation, useDeleteUserOrdersMutation } from '../../../redux/api-queries/order-queries';
import Alert from '../../shared/alert';
import { useGetUserQuery } from '../../../redux/api-queries/auth-queries';

interface Props {
    orders: Order[]
}


const UserDetails = ({ orders }: Props) => {
    const [ deleteUserOrders, { data: deleteUserOrdersData, error: deleteUserOrdersError, isLoading}] = useDeleteUserOrdersMutation();
    const { data: user } = useGetUserQuery(localStorage.getItem('token') || '');
    const [ userId, setUserId ] = useState<string | undefined>(user?._id);
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const [ deleteOrder, { data, error }] = useDeleteOrderMutation();
    const [ lastOrder, setLastOrder ] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDeleteOrder = async (orderId: string) => {
        if (orderId) {       
            await deleteOrder({orderId, token: localStorage.getItem('token') || ''});
            if (orders.length === 1) {
                setLastOrder(true);
            }  
        }
    }

    const handleDeleteUserOrders = async () => {
        if (userId) {
            await deleteUserOrders({userId, token: localStorage.getItem('token') || ''});
            setIsDeleting(false);
            setLastOrder(true);
        }
    }

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
    }

    const handleClose = () => {
        setIsDeleting(false);
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
                                                handleDeleteOrder={()=>handleDeleteOrder(order._id)}
                                            >
                                                <h2>your order</h2>  
                                            </OrderComponent>
                            }
                            })}
                        </div>    
                </>}
                { isDeleting &&
                    <>
                        <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                            <Alert 
                                text={`are you sure you want to delete all orders from the system permanently?`}
                                handleCancel={handleClose} 
                                handleConfirm={handleDeleteUserOrders}
                            />
                        </Dialog>
                        <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                        <Outlet />
                    </>
                }
            </>
        )
    }  


export default UserDetails;

