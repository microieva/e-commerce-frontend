import { FC, useEffect, useState, MouseEvent, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Backdrop, Dialog, IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteProductMutation } from '../../redux/api-queries/product-queries';

import UpdateProductForm from '../forms/update-product-form';
import CartActions from '../shared/cart-actions';

import { Product } from '../../@types/product';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import Alert from '../shared/alert';
import Loading from '../shared/loading';
import { ThemeContext } from '../../contexts/theme';


interface Props {
    product: Product
}

const ProductView: FC<Props> = ({ product }) => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const { data: user } = useGetUserQuery(token);
    
    const [ admin, setAdmin ] = useState<boolean>(false);
    const [ deleteProduct, { data, error, isLoading } ] = useDeleteProductMutation();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsDeleting(false);
    }

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
    }

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
	}, [token]);

    useEffect(()=> {
        if (data && !error && !isLoading) {
            navigate('/');
        }
    }, [data]);

    const handleDelete = async () => {
        await deleteProduct({token: localStorage.getItem('token') || '', productId: product._id});
        navigate('/');
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="view-wrapper">
                <div className='view-header'>
                    <h2>{product.title.toLowerCase()}</h2>
                    <div className="btn-group">
                        { admin ? 
                            <>
                                <IconButton onClick={(e)=> onDelete(e)} style={{padding: "0.8rem"}}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                                <IconButton onClick={()=> navigate("/products/new")} style={{padding: "0.8rem"}}>
                                    <PlaylistAddOutlinedIcon />
                                </IconButton> 
                                <IconButton onClick={()=> navigate('/')}>
                                    <DoorBackOutlinedIcon/>
                                </IconButton>
                            </>
                        :
                            <>
                                <CartActions product={product}>
                                    <IconButton onClick={()=> navigate('/')}>
                                        <DoorBackOutlinedIcon/>
                                    </IconButton>
                                </CartActions>
                                
                            </>
                        }
                        
                    </div>
                </div>
                <div className='view-details'>
                    <ThemeProvider theme={theme}>
                        {product && <UpdateProductForm product={product} admin={admin}/>}
                    </ThemeProvider>
                    <div className="img-wrapper">
                        <img className="circle-img" src={`${product.images[product.images.length-1]}`} alt="profile" />
                    </div>
                </div>
            </div>
            { isDeleting &&
                <>
                    <ThemeProvider theme={theme}>
                            <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                                <Alert 
                                    text={`delete product "${product.title}" permanently?`}
                                    handleCancel={handleClose} 
                                    handleConfirm={handleDelete}
                                />
                            </Dialog>
                            <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                    </ThemeProvider>
                    <Outlet />
                </>
            }
        </>
    )
}

export default ProductView;