
import { Backdrop, Dialog, IconButton, ThemeProvider } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { lightTheme } from '../../../shared/theme';
import { User } from '../../../@types/user';
import UpdateUserForm from '../../forms/update-user-form';
import { useDeleteUserMutation } from '../../../redux/api-queries/user-queries';
import { useEffect, useState } from 'react';
import Alert from '../../shared/alert';

interface Props {
    user: User
}

const AccountDetails = ({ user }: Props) => {
    const [ deleteUser, { data, error, isLoading }] = useDeleteUserMutation();
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        await deleteUser({ token: localStorage.getItem('token') || '', _id: user._id})
        localStorage.removeItem('token');
    }
    const handleClose = () => {
        setIsDeleting(false);
    }

    useEffect(()=> {
        if (!error && data) {
            // snackbar
            navigate('/');
        }
    }, [ data ])

        return (
            <>
                <div className='view-header'>
                    <h2>account details</h2>
                    <div className='btn-group'>
                        <IconButton onClick={()=> setIsDeleting(true)}>
                            <PersonOffIcon/>
                        </IconButton>
                        <IconButton onClick={()=> navigate('/')}>
                            <DoorBackOutlinedIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className='view-details'>
                    <ThemeProvider theme={lightTheme}>
                        {user && <UpdateUserForm user={user}/>}
                    </ThemeProvider>
                    <div className="img-wrapper">
                        <img className="circle-img" src={`${user.avatar}`} alt="profile picture" />
                    </div>
                </div>
                { isDeleting &&
                    <>
                        <ThemeProvider theme={lightTheme}>
                                <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                                    <Alert 
                                        text={'are you sure you want to delete your account?'}
                                        handleCancel={handleClose} 
                                        handleConfirm={handleDeleteUser}
                                    />
                                </Dialog>
                                <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                        </ThemeProvider>
                        <Outlet />
                    </>
                }
            </>
        )
    }  


export default AccountDetails;

