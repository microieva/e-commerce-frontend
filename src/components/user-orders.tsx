
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../@types/cart';
import OrderComponent from './order';
import { useDeleteOrderMutation } from '../redux/api-queries/order-queries';
import { useEffect, useState } from 'react';

interface Props {
    orders: Order[]
}


const UserDetails = ({ orders }: Props) => {
    const [ deleteOrder, { data, error: deletingError }] = useDeleteOrderMutation();
    const [ order, setOrder ] = useState<boolean>(Boolean(data));
    const navigate = useNavigate();

    const handleDeleteOrder = async (orderId: string) => {
        if (orderId) {
            await deleteOrder({orderId, token: localStorage.getItem('token') || ''});
            setOrder(false);
        }
    }

    useEffect(()=> {
        if (data && data.msg) {
            console.log('msg :', data.msg) // snackbar
        }
    }, [data]);

        return (
            <>
                <div className='view-header'>
                    <h2>orders</h2>
                    <div className='btn-group'>
                        <IconButton onClick={()=> console.log('setDeleteAllOrders(true)')}>
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

