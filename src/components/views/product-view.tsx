import { FC, useEffect, useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteProductMutation } from '../../redux/api-queries/product-queries';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import UpdateProductForm from '../forms/update-product-form';
import CartActions from '../shared/cart-actions';
import Loading from '../shared/loading';
import { SnackBarContext } from '../../contexts/snackbar';
import { AlertContext } from '../../contexts/alert';
import { TypeAlertContext, TypeSnackBarContext } from '../../@types/types';
import { Product } from '../../@types/product';


interface Props {
    product: Product
}

const ProductView: FC<Props> = ({ product }) => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data: user } = useGetUserQuery(token);
    
    const [ admin, setAdmin ] = useState<boolean>(false);
    const [ deleteProduct, { data, error, isLoading } ] = useDeleteProductMutation();
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const navigate = useNavigate();

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setAlert({text: `Delete "${product.title}" from the database?`, open: true, action: "isDeletingProduct"});
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
        const onDeleteProduct = async()=> {
            if (isConfirming === "isDeletingProduct") {
                try {
                    await deleteProduct({token: localStorage.getItem('token') || '', productId: product._id});
                    setSnackBar({message: `${product.title} deleted successfuly`, open: true});
                    setAlert({open: false, action: null});
                    navigate('/');
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        onDeleteProduct()
    }, [isConfirming]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="view-wrapper with-border">
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
                                <IconButton onClick={()=> navigate(-1)}>
                                    <DoorBackOutlinedIcon/>
                                </IconButton>
                            </CartActions>
                            
                        </>
                    }
                    
                </div>
            </div>
            <div className='view-details'>
                    {product && <UpdateProductForm product={product} admin={admin}/>}
                <div className="img-wrapper">
                    <img className="circle-img" src={`${product.images[product.images.length-1]}`} alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default ProductView;