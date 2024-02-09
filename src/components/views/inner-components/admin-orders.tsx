
import { useEffect, useState, MouseEvent, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, Dialog, Divider, IconButton, ThemeProvider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Order } from '../../../@types/cart';
import OrderComponent from '../../shared/order';
import { useDeleteOrderMutation, useDeleteOrdersMutation } from '../../../redux/api-queries/order-queries';
import Alert from '../../shared/alert';
import { ThemeContext } from '../../../contexts/theme';

interface Props {
    orders: Order[],
}


const AdminOrders = ({ orders }: Props) => {
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const [ deleteOrders, { data: deleteAllOrdersData, error: deleteAllOrdersError, isLoading}] = useDeleteOrdersMutation();
    const [ deleteOrder, { data, error }] = useDeleteOrderMutation();
    const [ lastOrder, setLastOrder ] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleDeleteOrder = async (orderId: string) => {
        if (orderId) {       
            await deleteOrder({orderId, token: localStorage.getItem('token') || ''});
            if (orders.length === 1) {
                setLastOrder(true);
            }  
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

    const handleDelete = async () => {
        await deleteOrders({token: localStorage.getItem('token') || ''});
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
                            <IconButton onClick={(e)=>onDelete(e)}>
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
                { isDeleting &&
                    <>
                        <ThemeProvider theme={theme}>
                                <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                                    <Alert 
                                        text={`are you sure you want to delete all orders from the system permanently?`}
                                        handleCancel={handleClose} 
                                        handleConfirm={handleDelete}
                                    />
                                </Dialog>
                                <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                        </ThemeProvider>
                        <Outlet />
                    </>
                }
            </>
        )
    }  


export default AdminOrders;

