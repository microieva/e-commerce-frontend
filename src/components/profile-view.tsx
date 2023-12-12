import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import UserDetails from './user-details';
import UserOrders from './user-orders';

const ProfileView: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    const { data: orders, error } = useGetOrdersByUserIdQuery({token: token, userId: user?._id || ""});
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        if (!token) {
            navigate('/')
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [token])

    return (
        <div className="view-container">
            {user && <UserDetails user={user}/>}
            {!error && orders && <UserOrders orders={orders} />}    
            <Outlet />
        </div>
    )
}

export default ProfileView;