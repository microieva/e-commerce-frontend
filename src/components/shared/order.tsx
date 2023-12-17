import PaymentIcon from '@mui/icons-material/Payment';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IconButton } from '@mui/material';
import { CartItem, Order } from '../../@types/cart';
import { useGetOrderItemsQuery } from '../../redux/api-queries/order-queries';
import { useEffect, useState } from 'react';
import OrderItems from './order-items';

interface Props {
    order: Order,
    children: React.JSX.Element,
    handleCheckout?: () => void,
    handleDeleteOrder: () => Promise<void>,
    handleOpenItems?: () => Promise<void>
}

const OrderComponent = ({ order, children, handleCheckout, handleDeleteOrder }: Props) => {
    const [ open, setOpen ] = useState<boolean>(false);
    
    
    const handleOpenItems = () => {
        if (order.paid) {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div className='order-container'>
                <div className='order-wrapper' onClick={()=> handleOpenItems()}>
                    <div>{children}</div>
                    <div>
                        <h2 style={{color: "darkgrey", alignSelf: "flex-end"}}>
                            total price: {order.totalPrice} €
                        </h2>
                        {order && 
                            <div className="btn-group" style={{float: "right"}}>
                                {!order.paid &&
                                <>
                                    <IconButton  onClick={handleCheckout}>
                                        <PaymentIcon/>
                                    </IconButton>
                                    <IconButton  onClick={()=> console.log('snackbar update')}>
                                        <EditNoteIcon/>
                                    </IconButton>
                                    <IconButton  onClick={handleDeleteOrder}>
                                        <RemoveShoppingCartIcon/>
                                    </IconButton>
                                </>}
                                {order.paid && <IconButton  onClick={handleDeleteOrder}>
                                    <RemoveShoppingCartIcon/>
                                </IconButton>}
                            </div>
                        }
                    </div>
                </div>
                    { open && 
                        <div className='order-items-wrapper'>
                            <OrderItems orderId={order._id} handleClose={handleClose}/>
                        </div>
                    }
            </div>
        </>
    )
}  


export default OrderComponent;

