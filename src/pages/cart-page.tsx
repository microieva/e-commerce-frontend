import { FC } from 'react'

import { useAppSelector } from '../hooks/useAppSelector';
import Header from '../components/header';
import CartView from '../components/cart-view';
import Footer from '../components/footer';

const CartPage: FC = () => { 
  const cart = useAppSelector(state => state.cart);

    return (
        <>
            <main>
                <Header/>
                {cart && <CartView cart={cart}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;