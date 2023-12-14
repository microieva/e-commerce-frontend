import { FC } from 'react'

import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import ProductFormView from '../components/views/product-form-view';

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