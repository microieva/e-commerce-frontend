import { FC } from 'react'

import Header from '../components/shared/header';
import CartView from '../components/views/cart-view';
import Footer from '../components/shared/footer';
import { Divider } from '@mui/material';

const CartPage: FC = () => { 

    return (
        <>
            <main>
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <CartView /> 
                <div className='divider'>
                    <Divider />
                </div>
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;