import { FC, useState, MouseEvent } from 'react';

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Product } from '../../@types/product';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../../redux/api-queries/product-queries';
import { Backdrop, Dialog, ThemeProvider } from '@mui/material';
import Alert from './alert';
import { lightTheme } from '../../shared/theme';
import Loading from './loading';

interface Props {
    product: Omit<Product, "categoryId">
}

const AdminActions: FC<Props> = ({ product }: Props) => {
    const [ deleteProduct, { data, error, isLoading}] = useDeleteProductMutation();
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/products/${product._id}`)
    }

    const handleDelete = async () => {
        await deleteProduct({token: localStorage.getItem('token') || '', productId: product._id});
        navigate('/');
    }

    const handleClose = () => {
        setIsDeleting(false);
    }

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
    }

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
                    onClick={handleUpdate}
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
            { isDeleting &&
                <>
                    <ThemeProvider theme={lightTheme}>
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

export default AdminActions;