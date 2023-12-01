import { FC } from 'react'
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import Header from '../components/header';
import ProductView from '../components/product-view';
import Footer from '../components/footer';
import Loading from '../components/loading';

const ProductPage: FC = () => { 
    const { productId } = useParams();
    const { data, isLoading } = useGetProductByIdQuery(Number(productId));

    return (
        <>
            <main>
                <Header/>
                {isLoading && <Loading />}
                {data && <ProductView product={data}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default ProductPage;