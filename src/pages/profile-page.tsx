import { FC } from 'react';

import Header from '../components/shared/header';
import ProfileView from '../components/views/profile-view';
import Footer from '../components/shared/footer';

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