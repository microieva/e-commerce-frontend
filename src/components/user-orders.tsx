
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../@types/cart';
import OrderComponent from './order';
import { useDeleteOrderMutation, useDeleteUserOrdersMutation } from '../redux/api-queries/order-queries';
import { useEffect, useState } from 'react';

interface Props {
    orders: Order[]
}


const UserDetails = ({ orders }: Props) => {
    const [ deleteOrder, { data: deletedOrder, error: deletingError }] = useDeleteOrderMutation();
    const [ deleteUserOrders, {data: deletedOrders, error, isLoading }] = useDeleteUserOrdersMutation();
    const [ order, setOrder ] = useState<boolean>(Boolean(deletedOrder));

    const handleDeleteOrder = async (orderId: string) => {
        if (orderId) {
            await deleteOrder({orderId, token: localStorage.getItem('token') || ''});
            setOrder(false);
        }
    }
    const handleDeleteAllOrders = async () => {
        await deleteUserOrders({ token: localStorage.getItem('token') || '', userId: orders[0].userId});
    }

    useEffect(()=> {
        if (deletedOrder && deletedOrder.msg) {
            //console.log('msg :', deletedOrder.msg) // snackbar
        }
    }, [deletedOrder]);

        return (
            <>
                <div className='view-header'>
                    <h2>orders</h2>
                    <div className='btn-group'>
                        <IconButton onClick={handleDeleteAllOrders}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div> 
                </div> 
                <div className="orders">
                        {orders.map(order => {
                            if (order.paid) {
                                return <OrderComponent 
                                            data={order} 
                                            handleDeleteOrder={()=>handleDeleteOrder(order._id)}
                                        >
                                            <div>
                                                <h2>your order</h2>
                                                <h2><span style={{color: "darkgrey"}}>created: date</span></h2>        
                                            </div> 
                                        </OrderComponent>
                        }
                        })}
                    </div>    
            </>
        )
    }  


export default UserDetails;

