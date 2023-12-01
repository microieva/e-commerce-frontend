import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteProductMutation } from '../redux/api-queries/product-queries';
import { orangeTheme } from '../shared/theme';
import { UserContext } from '../contexts/user';
import ProductForm from './product-form';
import CartActions from './cart-actions';
import { TypeUserContext } from '../@types/types';
import { Product } from '../@types/product';

interface Props {
    product: Product
}

const ProductView: FC<Props> = ({ product }) => {
    const { user } = useContext(UserContext) as TypeUserContext;
    const [ admin, setAdmin ] = useState<boolean>(false);
    const [ deleteProduct ] = useDeleteProductMutation();
    const goBack = useNavigate();

    useEffect(()=> {
        user && user.role === 'admin' && setAdmin(true);
    }, [user]);

    const onDelete = () => {
        deleteProduct(product._id);
        goBack('/');
    }

    return (
        <div className="view-container">
            <div className='view-header'>
                <h2>product</h2>
                <div className="icons">
                    {!admin && <CartActions product={product}/>}
                    {admin && 
                        <IconButton onClick={()=> onDelete()} style={{padding: "0.8rem"}}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    }
                    <IconButton onClick={()=> goBack('/')} style={{padding: "0.8rem"}}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <ThemeProvider theme={orangeTheme}>
                    {product && <ProductForm product={product}/>}
                </ThemeProvider>
                <div className="img-wrapper">
                    <img src={`${product.images[product.images.length-1]}`} alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default ProductView;