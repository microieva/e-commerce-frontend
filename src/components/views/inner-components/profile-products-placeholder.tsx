import { FC, useState, MouseEvent } from "react"
import { Backdrop, Dialog, Divider, IconButton } from "@mui/material"
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Outlet, useNavigate } from "react-router-dom"
import Alert from "../../shared/alert";
import { useDeleteProductsMutation } from "../../../redux/api-queries/product-queries";

export const ProfileProductsPlaceholder: FC = () => {
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const [ deleteProducts, { data, error, isLoading}] = useDeleteProductsMutation();
    
    const navigate = useNavigate();

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
    }

    const handleClose = () => {
        setIsDeleting(false);
    }

    const handleDelete = async () => {
        await deleteProducts(localStorage.getItem('token') || '');
        navigate('/');
    }

    return (
        <>
            <Divider />
            <div className='view-header' style={{margin: "6rem 0"}}>
                <h2>products</h2>
                <div className='btn-group'>
                    <IconButton onClick={()=> navigate("/products/new")}>
                        <PlaylistAddOutlinedIcon />
                    </IconButton> 
                    <IconButton onClick={(e)=>onDelete(e)}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </div> 
            </div> 
            { isDeleting &&
                <>
                    <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                        <Alert 
                            text={`are you sure you want to delete all products permanently?`}
                            handleCancel={handleClose} 
                            handleConfirm={handleDelete}
                        />
                    </Dialog>
                    <Backdrop open={isDeleting} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                    <Outlet />
                </>
            }
        </>
    )
}

