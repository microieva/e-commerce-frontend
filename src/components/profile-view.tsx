import { FC, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';
import OrderComponent from './order';
import { Order } from '../@types/cart';


interface Props {
    user: User,
    orders?: Order[]
}

const ProfileView: FC<Props> = ({ user, orders }) => {
    const [ loggedInUser, setLoggedInUser ] = useState<User>(user);
    
    const goBack = useNavigate();

    useEffect(()=> {
        setLoggedInUser(user)
    }, [user])

    return (
        <>
        {loggedInUser ? 
            <div className="view-container">
                <div className='view-header'>
                    <h2>profile</h2>
                    <div className='btn-group'>
                            {user.role === 'ADMIN' && 
                            <Link to={`/products/new`}>
                                <IconButton>
                                    <PlaylistAddOutlinedIcon/>  
                                </IconButton>
                            </Link>}
                            <IconButton onClick={()=> goBack('/')}>
                                <DoorBackOutlinedIcon/>
                            </IconButton>
                    </div>
                </div>
                <div className='view-details profile-view-details'>
                    <div className="profile-details-text">
                        <p><span>account name:</span> {user.name}</p>
                        <p><span>account email:</span> {user.email}</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={`${user.avatar}`} alt="profile picture" />
                    </div>
                </div>
                <div className="orders">
                    orders:
                    {orders && orders.map(order => {
                        return <OrderComponent data={order} />
                    })}
                </div>
            </div>
            :
            goBack('/')
            }
            <Outlet />
        </>
    )
}

export default ProfileView;