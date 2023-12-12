import { FC, useEffect, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import ProfileView from '../components/profile-view';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import { useGetOrdersByUserIdQuery } from '../redux/api-queries/order-queries';


const ProfilePage: FC = () => {
    // const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    // const { data: user } = useGetUserQuery(token);
    // const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery({token, userId: user?._id || ""})
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const handleStorage = () => {
    //         setToken(localStorage.getItem('token') || '');
    //     }
    //     if (!user) {
    //         navigate('/');
    //     }
    //     window.addEventListener('storage', handleStorage)
    //     return () => window.removeEventListener('storage', handleStorage)
    // }, [token]);

    return (
        <>
            <main>
                <Header/>
                <ProfileView />
            </main>
            <Footer />
        </>
    ) 
}

export default ProfilePage;