import { FC } from 'react';
import { Order } from '../@types/cart';
import { useAppSelector } from '../hooks/useAppSelector';
import PaymentIcon from '@mui/icons-material/Payment';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IconButton } from '@mui/material';
import { emptyCart } from '../redux/app-reducers/cart';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface Props {
    data: Order
}

const OrderComponent: FC<Props> = ({ data }) => {
    const cart = useAppSelector(state => state.cart); 
    const dispatch = useAppDispatch();
    const numberOfItems = cart.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0);

    const onCheckout = () => {
        dispatch(emptyCart());
    }
  return (
   <div className='order-container'>
        {cart.length > 0 ?
            <>
                <div>
                    <h2>your order <span style={{color: "darkgrey"}}>/ {numberOfItems} {numberOfItems===1 ? ' item': ' items'}</span></h2>
                    
                </div>
                <div>
                    <h2 style={{color: "darkgrey", alignSelf: "flex-end"}}>
                        total price: {data.totalPrice} €
                    </h2>
                    <div className="btn-group" style={{float: "right"}}>
                        <IconButton  onClick={()=> onCheckout()}>
                            <PaymentIcon/>
                        </IconButton>
                        <IconButton  onClick={()=> console.log('snackbar update')}>
                            <PlaylistAddCheckIcon/>
                        </IconButton>
                        <IconButton  onClick={()=> console.log('snackbar cancel === deleteOrder')}>
                            <RemoveShoppingCartIcon/>
                        </IconButton>
                    </div>
                </div>
            </>
            :
            <div>
                <h2 style={{color: "darkgrey", alignSelf:'center'}}>
                    thank you for shopping with us!
                </h2>
            </div>
            }
   </div>
  );
}

export default OrderComponent;