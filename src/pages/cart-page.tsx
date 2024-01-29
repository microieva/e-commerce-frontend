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
                {/* <div className='divider'>
                    <Divider />
                </div> */}
                <div className="cart-container">
                    <CartView /> 
                </div>
                <div className='divider'>
                    <Divider />
                </div>
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;