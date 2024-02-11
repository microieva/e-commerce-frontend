import { FC } from 'react'

import Header from '../components/shared/header';
import CartView from '../components/views/cart-view';
import Footer from '../components/shared/footer';
import { Divider } from '@mui/material';

const CartPage: FC = () => { 

    return (
        <>
            <main className="main-container">
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <div className="cart-container">
                    <CartView /> 
                </div>
            <Divider className='bottom-divider' style={{width: "30%", margin: "10% auto"}}/>
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;