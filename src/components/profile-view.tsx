import { FC, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import OrderComponent from './order';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';

const ProfileView: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
    const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery({token, userId: user?._id || ""})
    const navigate = useNavigate();

    // delete all users orders api call
    // const numberOfItems = orders && orders.reduce((total, item) => {
    //     return total + item.quantity;
    // }, 0);
    const goBack = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }  
        if (!token) {
            navigate('/');
        }
        user && setLoggedInUser(user);

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
        
    }, [token]);

    return (
        <>
        {loggedInUser ? 
            <div className="view-container profile-view-container">
                <div className='view-header'>
                    <h2>profile</h2>
                    <div className='btn-group'>
                            {loggedInUser.role === 'ADMIN' && 
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
                <div className='view-details'>
                    <div className="profile-details-text">
                        <p><span>account name:</span> {loggedInUser.name}</p>
                        <p><span>account email:</span> {loggedInUser.email}</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={`${loggedInUser.avatar}`} alt="profile picture" />
                    </div>
                </div>
                { orders && 
                    <>
                        <div className='view-header'>
                            <h2>orders</h2>
                            <div className='btn-group'>
                                    {/* {user.role === 'ADMIN' && 
                                    <Link to={`/products/new`}>
                                        <IconButton>
                                            <PlaylistAddOutlinedIcon/>  
                                        </IconButton>
                                    </Link>} */}
                                    <IconButton onClick={()=> console.log('setDeleteAllOrders(true)')}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                            </div>
                        </div>
                        <div className="orders">
                            {orders.map(order => {
                                return  order.paid && 
                                    <OrderComponent data={order}>
                                        <div>
                                            <h2>your order</h2>
                                            <h2><span style={{color: "darkgrey"}}>created: date</span></h2>        
                                        </div> 
                                    </OrderComponent>
                            })}
                        </div>
                    </>
                }
            </div>
            :
            goBack('/')
            }
            <Outlet />
        </>
    )
}

export default ProfileView;