import { FC } from 'react'

import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import ProductFormView from '../components/views/product-form-view';
import { Divider } from '@mui/material';

const ProductFormPage: FC = () => { 
    return (
        <>
            <main className="main-container">
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                <ProductFormView />
                <div className='divider'>
                    <Divider />
                </div>
            </main>
            <Footer />
        </>
    ) 
}

export default ProductFormPage;