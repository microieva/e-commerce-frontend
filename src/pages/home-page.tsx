import { FC } from 'react';
import { Divider } from "@mui/material"
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import HomeView from '../components/views/home-view';

const HomePage: FC = () => {

    return (
        <>
            <main>
                <Header/>
                <HomeView />
            </main>
            <Divider style={{width: "30%", margin: "auto"}}/>
            <Footer />
        </>
    ) 
}

export default HomePage;