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
    
    const handleClick = () => {
        if (order.paid && !open) {
            setOpen(true);
        } else if (order.paid && open) {
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEdit = () => {
        
    }
    
    return (
            <div className='order-container'>
                <div className="order-wrapper" id={order.paid ? "hover" : ""} onClick={()=> handleClick()} style={{}}>
                    <div>
                        {children}   
                        <h2 style={{color: "darkgrey"}}>
                            total price: {uiPrice} €
                        </h2>
                    </div>
                    <div>  
                        <h2 style={{color: "darkgrey", fontSize:"18px"}}>{uiDate}</h2> 
                        {order && 
                            <div className="btn-group">
                                {!order.paid &&
                                <>
                                    <IconButton  onClick={handleCheckout}>
                                        <PaymentIcon/>
                                    </IconButton>
                                    <IconButton  onClick={handleEdit}>
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
                { open && <OrderItems orderId={order._id} handleClose={handleClose}/> }
            </div>
    )
}  


export default OrderComponent;

