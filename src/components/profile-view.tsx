import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import AccountDetails from './account-details';
import UserView from './user-view';
import AdminView from './admin-view';


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
    console.log('profile-view')
    return (
        <div className="view-container">
            {user && <AccountDetails user={user}/>}
            { admin ? 
                <AdminView />
            :
                <UserView userId={userId}/>
            }
            <Outlet />
        </div>
    )
}

export default ProfileView;