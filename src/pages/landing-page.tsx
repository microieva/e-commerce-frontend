import { FC } from 'react';
import { Divider } from "@mui/material"
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import LandingView from '../components/views/landing-view';

const LandingPage: FC = () => {

    return (
        <>
            <main className="main-container">
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <LandingView/>
            </main>
            <Divider style={{width: "30%", margin: "10% auto"}}/>
            <Footer />
        </>
    ) 
}

export default LandingPage;