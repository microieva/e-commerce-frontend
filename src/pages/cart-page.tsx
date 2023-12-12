import { FC } from 'react'

import Header from '../components/header';
import CartView from '../components/cart-view';
import Footer from '../components/footer';

const CartPage: FC = () => { 
    //const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    //const { data: user } = useGetUserQuery(token);
    //const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery({token, userId: user?._id || ""})
    ///const navigate = useNavigate();

    // useEffect(() => {
    //     const handleStorage = () => {
    //         setToken(localStorage.getItem('token') || '');
    //      }
       
    //     window.addEventListener('storage', handleStorage)
    //     return () => window.removeEventListener('storage', handleStorage)
    // }, [user]);

    return (
        <>
            <main>
                <Header/>
                <CartView /> 
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;