import { FC } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Section from '../components/section';

const HomePage: FC = () => {

    return (
        <>
            <main>
                <Header />
                <Section />
            </main>
            <Footer />
        </>
    ) 
}

export default HomePage;