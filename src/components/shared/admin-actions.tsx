import { FC, useState, MouseEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { useDeleteProductMutation } from '../../redux/api-queries/product-queries';
import { SnackBarContext } from '../../contexts/snackbar';
import { AlertContext } from '../../contexts/alert';
import Loading from './loading';
import { TypeAlertContext, TypeSnackBarContext } from '../../@types/types';
import { Product } from '../../@types/product';

interface Props {
    product: Omit<Product, "categoryId">
}

const AdminActions: FC<Props> = ({ product }: Props) => {
    const [ deleteProduct, { data, error, isLoading}] = useDeleteProductMutation();
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const navigate = useNavigate();

    const onUpdate = () => {
        navigate(`/products/${product._id}`)
    }

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setAlert({text: `Delete "${product.title}" from the database?`, open: true, action: "isDeletingProduct"});
    }

    useEffect(()=> {
        const onDeleteProduct = async()=> {
            if (isConfirming === "isDeletingProduct") {
                try {
                    await deleteProduct({token: localStorage.getItem('token') || '', productId: product._id});
                    setAlert({open: false, action: null});
                    setSnackBar({message: `${product.title} successfuly deleted`, open: true});
                    navigate('/');
                } catch (error) {
                    setSnackBar({message: error as string, open: true})
                }
            }
        }
        onDeleteProduct();
    }, [isConfirming])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className='btn-group' 
                style={{
                    float: "right", 
                    position: "relative", 
                    zIndex:"0"
                }}
            >
                <IconButton 
                    aria-label="add" 
                    size="large" 
                    onClick={onUpdate}
                    sx={{
                        '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                            {
                                backgroundColor: "rgb(61,61,61, 0.2)"
                            }
                    }}
                >
                    <EditNoteIcon/>
                </IconButton>
                <IconButton 
                    aria-label="delete" 
                    size="large" 
                    onClick={(e)=> onDelete(e)}
                    sx={{
                        '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                            {
                                backgroundColor: "rgb(61,61,61, 0.2)"
                            }
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        </>
  )
}

export default AdminActions;