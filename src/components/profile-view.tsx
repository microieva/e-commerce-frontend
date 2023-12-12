import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import UserDetails from './user-details';
import UserOrders from './user-orders';

const ProfileView: FC = () => {
    const { data: user } = useGetUserQuery(localStorage.getItem('token') || '');
    const { data: orders, error } = useGetOrdersByUserIdQuery({token: localStorage.getItem('token') || '', userId: user?._id || ""})

    return (
        <div className="view-container">
            {user && <UserDetails user={user}/>}
            {!error && orders && <UserOrders orders={orders} />}    
            <Outlet />
        </div>
    )
}

export default ProfileView;