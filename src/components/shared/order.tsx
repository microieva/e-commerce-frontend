import PaymentIcon from '@mui/icons-material/Payment';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import { Order } from '../../@types/cart';
import { useState } from 'react';
import OrderItems from './order-items';
import { useUiDate } from '../../hooks/useUiDate';
import { formatUiPrice } from '../../shared/formatUiPrice';

interface Props {
    order: Order,
    children: React.JSX.Element,
    handleCheckout?: () => void,
    handleDeleteOrder: () => Promise<void>,
    handleOpenItems?: () => Promise<void>
}

const OrderComponent = ({ order, children, handleCheckout, handleDeleteOrder }: Props) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const uiPrice = formatUiPrice(order.totalPrice);
    const uiDate = useUiDate(order.createdAt);
    
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
                    <div>
                        {children}
                        <h2><span style={{color: "darkgrey"}}>{uiDate}</span></h2> 
                    </div>
                    <div>
                        <h2 style={{color: "darkgrey", alignSelf: "flex-end"}}>
                            total price: {uiPrice} €
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
                                    <DeleteOutlineIcon/>
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

