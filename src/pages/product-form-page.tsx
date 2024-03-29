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
                <div className="product-form-container"> 
                    <ProductFormView />
                </div>
            </main>
            <Divider style={{width: "30%", margin: "10% auto"}}/>
            <Footer />
        </>
    ) 
}

export default ProductFormPage;