import { FC, MouseEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, IconButton } from "@mui/material"
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteProductsMutation } from "../../../redux/api-queries/product-queries";
import { AlertContext } from "../../../contexts/alert";
import { SnackBarContext } from "../../../contexts/snackbar";
import { TypeAlertContext, TypeSnackBarContext } from "../../../@types/types";

export const ProfileProducts: FC = () => {
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const [ deleteProducts, { data, error, isLoading}] = useDeleteProductsMutation();
    
    const navigate = useNavigate();

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setAlert({text: "Delete all products from the system ?", open: true, action:"isDeletingAllProducts"})
    }

    useEffect(()=> {
        const onDeleteAllProducts = async()=> {
            try {
                await deleteProducts(localStorage.getItem('token') || '');
                setAlert({open: false, action: null});
                setSnackBar({message: "Products deleted successfuly", open: true});
            } catch (error) {
                setSnackBar({message: error as string, open: true});
            }
        }
        if (isConfirming === "isDeletingAllProducts") {
            onDeleteAllProducts()
        }
    }, [isConfirming]);

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
        </>
    )
}

