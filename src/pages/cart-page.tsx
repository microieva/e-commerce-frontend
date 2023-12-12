import { FC, useEffect, useState } from 'react'

import { useAppSelector } from '../hooks/useAppSelector';
import Header from '../components/header';
import CartView from '../components/cart-view';
import Footer from '../components/footer';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';

const CartPage: FC = () => { 
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    //const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery({token, userId: user?._id || ""})
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
         }
       
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [user]);
    // fetch user in CartView
    return (
        <>
            <main>
                <Header/>
                { user && <CartView user={user}/> }
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;