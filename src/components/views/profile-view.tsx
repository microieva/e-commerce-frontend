import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import AccountDetails from './inner-components/account-details';
import AdminDashboard from './admin-dashboard';
import Loading from '../shared/loading';
import Orders from './inner-components/orders';
import { useGetOrdersByUserIdQuery } from '../../redux/api-queries/order-queries';


const ProfileView: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user, isLoading } = useGetUserQuery(token);
    const [ admin, setAdmin ] = useState<boolean>(Boolean(user?.role === "ADMIN"));
    const [ userId, setUserId ] = useState<string>(user?._id || ''); 
    const { data: userOrders } = useGetOrdersByUserIdQuery({ token, userId });  
    
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        user && setAdmin(user.role === "ADMIN");
        user && setUserId(user._id);

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [user]);

    useEffect(()=> {
        if (!token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="view-wrapper">
            { isLoading ? <Loading /> :
                <>
                    { user && <AccountDetails user={user}/> }
                    { userOrders && <Orders orders={userOrders}/> }
                    { admin && <AdminDashboard/> }
                    <Outlet />
                </>
            }
        </div>
    )
}

export default ProfileView;