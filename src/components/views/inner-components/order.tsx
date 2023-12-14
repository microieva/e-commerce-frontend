import { FC, useEffect, useState } from 'react';
import { Order } from '../../../@types/cart';
import { useAppSelector } from '../../../hooks/useAppSelector';
import PaymentIcon from '@mui/icons-material/Payment';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IconButton } from '@mui/material';
import { emptyCart } from '../../../redux/app-reducers/cart';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useUpdateOrderMutation } from '../../../redux/api-queries/order-queries';

interface Props {
    data: Order,
    children: React.JSX.Element,
    handleCheckout?: () => void,
    handleDeleteOrder: () => Promise<void>;
}

const OrderComponent = ({ data, children, handleCheckout, handleDeleteOrder }: Props) => {

        return (
            <div className='order-container'>
            <div>{children}</div>
            <div>
                <h2 style={{color: "darkgrey", alignSelf: "flex-end"}}>
                    total price: {data.totalPrice} €
                </h2>
                {data && 
                    <div className="btn-group" style={{float: "right"}}>
                        {!data.paid &&
                        <>
                            <IconButton  onClick={handleCheckout}>
                                <PaymentIcon/>
                            </IconButton>
                            <IconButton  onClick={()=> console.log('snackbar update')}>
                                <PlaylistAddCheckIcon/>
                            </IconButton>
                            <IconButton  onClick={handleDeleteOrder}>
                                <RemoveShoppingCartIcon/>
                            </IconButton>
                        </>}
                        {data.paid && <IconButton  onClick={handleDeleteOrder}>
                            <RemoveShoppingCartIcon/>
                        </IconButton>}
                    </div>
                }
            </div>
        </div>)
    }  


export default OrderComponent;

