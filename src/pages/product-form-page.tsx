import { FC } from 'react'

import Footer from '../components/footer';
import Header from '../components/header';
import ProductFormView from '../components/product-form-view';

const ProductFormPage: FC = () => { 
    return (
        <>
            <main>
                <Header/>
                <ProductFormView />
            </main>
            <Footer />
        </>
    ) 
}

export default ProductFormPage;