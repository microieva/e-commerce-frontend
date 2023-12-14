
import { Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../@types/cart';
import OrderComponent from './order';
import { useDeleteOrderMutation } from '../redux/api-queries/order-queries';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    orders: Order[],
    handleDeleteOrders: ()=>Promise<void>
}


const UserDetails = ({ orders, handleDeleteOrders }: Props) => {
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
                    <div className='view-header' style={{marginTop: "1rem"}}>
                        <h2>orders</h2>
                        <div className='btn-group'>
                            <IconButton onClick={()=>handleDeleteOrders()}>
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
                </>}
            </>
        )
    }  


export default UserDetails;
