import { FC } from 'react';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import Section from '../components/views/inner-components/section';

const HomePage: FC = () => {

    return (
        <>
            <main>
                <Header/>
                <Section />
            </main>
            <Footer />
        </>
    ) 
}

export default HomePage;