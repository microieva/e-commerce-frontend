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
            <main className="main-container">
                <Header/>
                <div className='divider'>
                    <Divider />
                </div>
                {isLoading && <Loading />}
                {data && 
                    <div className='product-container'>
                        <ProductView product={data}/>    
                    </div>
                }
            </main>
            <Divider style={{width: "30%", margin: "10% auto"}}/>
            <Footer />
        </>
    ) 
}

export default ProductPage;