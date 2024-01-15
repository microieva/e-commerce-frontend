import { FC } from 'react';
import { Divider } from "@mui/material"
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import Section from '../components/views/inner-components/section';

const HomePage: FC = () => {

    return (
        <>
            <main>
                <Header/>
                <Section />
                <div className='divider'>
                    <Divider />
                </div>
            </main>
            <Footer />
        </>
    ) 
}

export default HomePage;