import { FC, useEffect } from 'react';

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Product } from '../../@types/product';
import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation } from '../../redux/api-queries/product-queries';

interface Props {
    product: Omit<Product, "categoryId">
}

const AdminActions: FC<Props> = ({ product }: Props) => {
    const [ deleteProduct, { data, error, isLoading}] = useDeleteProductMutation();
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/products/${product._id}`)
    }

    const handleDelete = async () => {
        await deleteProduct({token: localStorage.getItem('token') || '', productId: product._id});
    }
    
    useEffect(()=>{
        console.log('data from deleting in cards view: ', data);
    }, [data]);

    return (
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
            >
                <EditNoteIcon/>
            </IconButton>
            <IconButton 
                aria-label="delete" 
                size="large" 
                onClick={handleDelete} 
            >
                <DeleteForeverIcon />
            </IconButton>
        </div>
  )
}

export default AdminActions;