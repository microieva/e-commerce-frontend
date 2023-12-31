import { FC } from 'react'
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import Header from '../components/shared/header';
import ProductView from '../components/views/product-view';
import Footer from '../components/shared/footer';
import Loading from '../components/shared/loading';
import { Divider } from '@mui/material';

const ProductPage: FC = () => { 
    const { productId } = useParams();
    const { data, isLoading } = useGetProductByIdQuery(productId as string);

    return (
        <>
            <main>
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                {isLoading && <Loading />}
                {data && 
                    <>
                        <ProductView product={data}/>
                        <div className='divider'>
                            <Divider />
                        </div>
                    </>
                }
            </main>
            <Footer />
        </>
    ) 
}

export default ProductPage;