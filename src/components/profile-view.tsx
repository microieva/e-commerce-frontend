import { FC, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import OrderComponent from './order';
import { useDeleteOrderMutation, useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import UserDetails from './user-details';
import UserOrders from './user-orders';

const ProfileView: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    const { data: orders, error: ordersError } = useGetOrdersByUserIdQuery({token, userId: user?._id || ""})
    const [ showOrders, setShowOrders ] = useState<boolean>(Boolean(orders===undefined));
    //const [ loggedInUser, setLoggedInUser ] = useState<User>(user);
   
    // delete all users orders api call

    const navigate = useNavigate();

    useEffect(()=> {
        if (orders && orders.length > 0) {
            setShowOrders(true);
        } 
        setShowOrders(false)
        console.log('empty orders')
    }, [orders])

    return (
        <div className="view-container">
            {user && <UserDetails user={user}/>}
            {showOrders && orders && <UserOrders orders={orders} />}
            <Outlet />
        </div>
    )
}

export default ProfileView;