import { FC, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MuiOrderItemsTable from '../tables/mui-order-items-table';
import { useGetOrderItemsQuery } from '../../redux/api-queries/order-queries';
import { CartItem } from '../../@types/cart';

interface Props {
    orderId: string,
    handleClose: ()=> void
}

const OrderItems: FC<Props> = ({ orderId, handleClose }) => {
    const { data: orderItemsData, error: orderItemsError, isLoading: isLoadingOrderItems} = useGetOrderItemsQuery({token: localStorage.getItem('token') || '', orderId});
    const [ orderItems, setOrderItems ] = useState<CartItem[] | undefined>(undefined);

    useEffect(()=> {
        if (orderItemsData && orderItemsData.length>0) {
            setOrderItems(orderItemsData);
        }
    }, [orderItemsData])
    
    return (
        <div className='order-items-wrapper'>
           {orderItems && <MuiOrderItemsTable data={orderItems}/>}
           <div className='btn-group'>
                <IconButton type ="button" onClick={handleClose}>
                    <HighlightOffIcon/>
                </IconButton> 
           </div>
        </div>
    );
}

export default OrderItems;