import { FC } from 'react';
import { Divider } from "@mui/material"
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import LandingView from '../components/views/landing-view';

const LandingPage: FC = () => {

    return (
        <>
            <main>
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <div className="view-container">
                    <LandingView/>
                </div>
            </main>
            <Divider style={{width: "30%", margin: "auto"}}/>
            <Footer />
        </>
    ) 
}

export default LandingPage;