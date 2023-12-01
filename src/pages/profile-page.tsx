import { FC, useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/user';
import Header from '../components/header';
import Footer from '../components/footer';

import { TypeUserContext } from '../@types/types';
import ProfileView from '../components/profile-view';
import { User } from '../@types/user';
import { useNavigate } from 'react-router-dom';


const ProfilePage: FC = () => {
    const { user, onLogin } = useContext(UserContext) as TypeUserContext;
    const [ profile, setProfile ] = useState<User | undefined>(user);
    const goBack = useNavigate();

    useEffect(()=> {
        onLogin();
        setProfile(user)
    }, [user]);

    return (
        <>
            {profile ? 
                <>
                    <main>
                        <Header/>
                        <ProfileView user={profile}/>
                    </main>
                    <Footer />
                </>
            :
            goBack('/')
            }
        </>
    ) 
}

export default ProfilePage;