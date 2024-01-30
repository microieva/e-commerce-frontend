import { FC } from 'react';

import Header from '../components/shared/header';
import ProfileView from '../components/views/profile-view';
import Footer from '../components/shared/footer';
import { Divider } from '@mui/material';

const ProfilePage: FC = () => {

    return (
        <>
            <main className="main-container">
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <div className="profile-container">
                    <ProfileView />
                </div>
            </main>
            <Divider className='bottom-divider' style={{width: "30%", margin: "10% auto"}}/>
            <Footer />
        </>
    ) 
}

export default ProfilePage;