import { FC, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { IconButton } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import OrderComponent from './order';
import { Order } from '../@types/cart';


interface Props {
    user: User,
    orders?: Order[]
}

const ProfileView: FC<Props> = ({ user, orders }) => {
    const [ loggedInUser, setLoggedInUser ] = useState<User>(user);
    // delete all users orders api call
    // will get number of imtes from order, from a click to open items:fetch orderItems from api !!!
    // const numberOfItems = orders && orders.reduce((total, item) => {
    //     return total + item.quantity;
    // }, 0);
    const goBack = useNavigate();

    useEffect(()=> {
        setLoggedInUser(user)
    }, [user])

    return (
        <>
        {loggedInUser ? 
            <div className="view-container profile-view-container">
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
                <div className='view-details'>
                    <div className="profile-details-text">
                        <p><span>account name:</span> {user.name}</p>
                        <p><span>account email:</span> {user.email}</p>
                    </div>
                    <div className="img-wrapper">
                        <img src={`${user.avatar}`} alt="profile picture" />
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