
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { User } from '../@types/user';

interface Props {
    user: User
}


const UserDetails = ({ user }: Props) => {
    const navigate = useNavigate();

        return (
            <>
                <div className='view-header'>
                    <h2>profile</h2>
                    <div className='btn-group'>
                        {user && user.role === 'ADMIN' && 
                            <Link to={`/products/new`}>
                                <IconButton>
                                    <PlaylistAddOutlinedIcon/>  
                                </IconButton>
                            </Link>
                        }
                        <IconButton onClick={()=> navigate('/')}>
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
            </>
        )
    }  


export default UserDetails;

