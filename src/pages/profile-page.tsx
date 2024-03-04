import { FC } from 'react';

import Header from '../components/shared/header';
import ProfileView from '../components/views/profile-view';
import Footer from '../components/shared/footer';
import { Divider } from '@mui/material';

const ProfilePage: FC = () => {

    return (
        <>
            <main>
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <div className="view-container">
                    <ProfileView />
                </div>
            </main>
            <Divider style={{width: "30%", margin: "auto"}}/>
            <Footer />
        </>
    ) 
}

export default ProfilePage;