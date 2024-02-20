
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useDeleteUserMutation } from '../../../redux/api-queries/user-queries';
import UpdateUserForm from '../../forms/update-user-form';
import { SnackBarContext } from '../../../contexts/snackbar';
import { AlertContext } from '../../../contexts/alert';
import { TypeAlertContext, TypeSnackBarContext } from '../../../@types/types';
import { User } from '../../../@types/user';

interface Props {
    user: User
}

const AccountDetails = ({ user }: Props) => {
    const [ deleteUser ] = useDeleteUserMutation();
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const navigate = useNavigate();

    const onDelete = () => {
        setAlert({text: "Delete account?", open: true, action: "isDeletingUser"});
    }

    useEffect(()=> {
        const onDeleteUser = async()=> {
            if (isConfirming === "isDeletingUser") {
                try {
                    await deleteUser({ token: localStorage.getItem('token') || '', _id: user._id})
                    localStorage.removeItem('token');
                    setSnackBar({message: "Account deleted", open: true});
                    setAlert({open: false, action: null});
                    navigate('/');
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        onDeleteUser();
    }, [isConfirming]);

        return (
            <>
                <div className='view-header'>
                    <h2>account details</h2>
                    <div className='btn-group'>
                        <IconButton onClick={onDelete}>
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
            </>
        )
    }  


export default AccountDetails;

