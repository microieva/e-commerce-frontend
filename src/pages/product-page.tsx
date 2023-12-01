import { FC } from 'react'
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import Header from '../components/header';
import ProductView from '../components/product-view';
import Footer from '../components/footer';
import Loading from '../components/loading';
import { Product } from '../@types/product';

const ProductPage: FC = () => { 
    const { productId } = useParams();
    const { data: product, isLoading } = useGetProductByIdQuery(productId as string);
    const data = product && 'data' in product ? product.data : {};

    return (
        <>
            <main>
                <Header/>
                {isLoading && <Loading />}
                {product && <ProductView product={data as Product}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default ProductPage;