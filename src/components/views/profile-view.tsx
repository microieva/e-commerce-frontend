import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import AccountDetails from './inner-components/account-details';
import UserProfileView from './user-profile-view';
import AdminProfileView from './admin-profile-view';


const ProfileView: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    const [ admin, setAdmin ] = useState<boolean>(Boolean(user?.role === "ADMIN"));
    const [ userId, setUserId ] = useState<string>(user?._id || '');   
    
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        user && setAdmin(user.role === "ADMIN");
        user && setUserId(user._id);

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [user]);

    useEffect(()=> {
        if (!token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="view-container">
            {user && <AccountDetails user={user}/>}
            { admin ? 
                <AdminProfileView />
            :
                <UserProfileView userId={userId}/>
            }
            <Outlet />
        </div>
    )
}

export default ProfileView;