import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteProductMutation } from '../redux/api-queries/product-queries';
import { orangeTheme } from '../shared/theme';

import UpdateProductForm from './update-product-form';
import CartActions from './cart-actions';

import { Product } from '../@types/product';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';

interface Props {
    product: Product
}

const ProductView: FC<Props> = ({ product }) => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    
    const [ admin, setAdmin ] = useState<boolean>(false);
    const [ deleteProduct, { data, error, isLoading } ] = useDeleteProductMutation();
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        user && setAdmin(user.role === "ADMIN")
       
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [user]);

    useEffect(()=>{
		if (!token) {
			setAdmin(false);
		}
	}, [token])

    useEffect(()=> {
        if (data && !error && !isLoading) {
            navigate('/');
        }
    }, [data, error, isLoading])

    const onDelete = () => {
        deleteProduct({ _id: product._id, token: token});
    }

    return (
        <div className="view-container">
            <div className='view-header'>
                <h2>product</h2>
                <div className="icons">
                    {!admin && <CartActions product={product}/>}
                    {admin && 
                        <>
                            <IconButton onClick={()=> onDelete()} style={{padding: "0.8rem"}}>
                                <DeleteForeverIcon/>
                            </IconButton>
                            <IconButton onClick={()=> navigate("/products/new")} style={{padding: "0.8rem"}}>
                                <PlaylistAddOutlinedIcon />
                            </IconButton> 
                        </>
                    }
                    <IconButton onClick={()=> navigate('/')} style={{padding: "0.8rem"}}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <ThemeProvider theme={orangeTheme}>
                    {product && <UpdateProductForm product={product} admin={admin}/>}
                </ThemeProvider>
                <div className="img-wrapper">
                    <img src={`${product.images[product.images.length-1]}`} alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default ProductView;