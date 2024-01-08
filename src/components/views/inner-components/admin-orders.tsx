
import { Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../../../@types/cart';
import OrderComponent from '../../shared/order';
import { useDeleteOrderMutation } from '../../../redux/api-queries/order-queries';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    orders: Order[],
    handleDeleteOrders: ()=>Promise<void>
}


const AdminOrders = ({ orders, handleDeleteOrders }: Props) => {
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

    useEffect(()=> {
        navigate('/auth/profile');
    }, [data])

        return (
            <>
                {!lastOrder &&<>
                    <Divider />
                    <div className='view-header' style={{marginTop: "6rem"}}>
                        <h2>orders</h2>
                        <div className='btn-group'>
                            <IconButton onClick={()=>handleDeleteOrders()}>
                                <DeleteForeverIcon/>
                            </IconButton>
                        </div> 
                    </div> 
                    <div className="profile-section">
                        {orders.map(order => {
                            if (order.paid) {
                                return <OrderComponent 
                                            order={order} 
                                            handleDeleteOrder={()=>handleDeleteOrder(order._id)}
                                        >
                                            <div>
                                                <h2>user's order</h2>       
                                            </div> 
                                        </OrderComponent>
                            }
                        })}
                    </div>    
                </>}
            </>
        )
    }  


export default AdminOrders;

