import { FC } from 'react';
import { Divider } from "@mui/material"
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import Section from '../components/views/inner-components/section';

const HomePage: FC = () => {

    return (
        <>
            <main className="main-container">
                <Header/>
                <Section />
            </main>
            <Divider className='bottom-divider' style={{width: "30%", margin: "10% auto"}}/>
            <Footer />
        </>
    ) 
}

export default HomePage;