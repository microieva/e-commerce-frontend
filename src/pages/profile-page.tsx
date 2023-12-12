import { FC } from 'react';

import Header from '../components/header';
import ProfileView from '../components/profile-view';
import Footer from '../components/footer';

const ProfilePage: FC = () => {

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