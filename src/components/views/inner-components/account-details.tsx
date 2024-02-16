
import { Backdrop, Dialog, IconButton } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { User } from '../../../@types/user';
import UpdateUserForm from '../../forms/update-user-form';
import { useDeleteUserMutation } from '../../../redux/api-queries/user-queries';
import { useContext, useState } from 'react';
import Alert from '../../shared/alert';
import { TypeSnackBarContext } from '../../../@types/types';
import { SnackBarContext } from '../../../contexts/snackbar';

interface Props {
    user: User
}

const AccountDetails = ({ user }: Props) => {
    const [ deleteUser ] = useDeleteUserMutation();
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        try {
            await deleteUser({ token: localStorage.getItem('token') || '', _id: user._id})
            localStorage.removeItem('token');
            setSnackBar({message: "Account deleted", open: true});
            navigate('/');
        } catch (error) {
            setSnackBar({message: error as string, open: true});
        }
    }
    const handleClose = () => {
        setIsDeleting(false);
    }

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
                        {user && <UpdateUserForm user={user}/>}
                    <div className="img-wrapper">
                        <img className="circle-img" src={`${user.avatar}`} alt="profile picture" />
                    </div>
                </div>
                { isDeleting &&
                    <>
                        <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                            <Alert 
                                text={'are you sure you want to delete your account?'}
                                handleCancel={handleClose} 
                                handleConfirm={handleDeleteUser}
                            />
                        </Dialog>
                        <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                        <Outlet />
                    </>
                }
            </>
        )
    }  


export default AccountDetails;

