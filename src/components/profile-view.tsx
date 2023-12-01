import { FC, useEffect, useState } from 'react';
import { User } from '../@types/user';
import { IconButton, ThemeProvider, Backdrop, Dialog } from '@mui/material';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import FormProvider from '../contexts/form';
import { orangeTheme } from '../shared/theme';
import ProductForm from './product-form';

interface Props {
    user: User
}

const ProfileView: FC<Props> = ({ user }) => {
    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
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
                            {user.role === 'admin' && 
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
            </div>
            :
            goBack('/')
            }
            <Outlet />
        </>
    )
}

export default ProfileView;