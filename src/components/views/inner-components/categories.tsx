import { useEffect, useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useDeleteCategoriesMutation, useDeleteCategoryMutation } from '../../../redux/api-queries/category-queries';
import { SnackBarContext } from '../../../contexts/snackbar';
import { AlertContext } from '../../../contexts/alert';
import CreateCategoryForm from '../../forms/create-category-form';
import CategoryComponent from './category';
import { TypeAlertContext, TypeSnackBarContext } from '../../../@types/types';
import { Category } from '../../../@types/product';

interface Props {
    categories: Category[]
}


const Categories = ({ categories }: Props) => {

    const [ deleteCategory, { data }] = useDeleteCategoryMutation();
    const [ deleteCategories ]= useDeleteCategoriesMutation();
    const [ categoryId, setCategoryId ] = useState<string | null>(null);
    const [ lastCategory, setLastCategory ] = useState<boolean>(false);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const { setAlert, isConfirming } = useContext(AlertContext) as TypeAlertContext;
    const navigate = useNavigate();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ disabled, setDisabled ] = useState<boolean>(false);

    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setAlert({text: "Delete all categories from the system?", open: true, action: "isDeletingAllCategories"});
    }
    useEffect(()=> {
        const onDeleteAllCategories = async()=> {
            try {
                await deleteCategories(localStorage.getItem('token') || '');
                setAlert({open: false, action: null});
                setSnackBar({message: "Categories deleted", open: true});
            } catch (error) {
                setSnackBar({message: error as string, open: true});
            }
        }
        const onDeleteCategory = async()=> {
            if (categoryId) {   
                try {
                    await deleteCategory({categoryId, token: localStorage.getItem('token') || ''});
                    setSnackBar({message: "Successfuly deleted", open: true});
                    setAlert({open: false, action: null});
                    if (categories.length === 1) {
                        setLastCategory(true);
                    }
                } catch (error) {
                    setSnackBar({message: error as string, open: true})
                }  
            }
        }
        if (isConfirming === "isDeletingAllCategories") {
            onDeleteAllCategories();
        } else if (isConfirming === "isDeletingCategory") {
            onDeleteCategory();
        }
    }, [isConfirming])
    const handleCancel = () => {
        setOpen(false);
        setDisabled(false);
    }
    const onClose = () => {
        setOpen(false);
        setDisabled(false);
    }

    useEffect(()=> {
        if (open) {
            setDisabled(true);
        }
    }, [open])

    useEffect(()=> {
        navigate('/auth/profile');
    }, [data])

        return (
            <>
                {!lastCategory &&
                    <>
                        <div className='devider'>
                            <Divider />
                        </div>
                        <div className="view-header-wrapper" style={{marginTop: "6rem", flexDirection:"column"}}>
                            <div className="view-header">
                                <h2>categories</h2>
                                <div className='btn-group'>
                                    <IconButton  disabled={disabled} onClick={()=> setOpen(true)}>
                                        <PlaylistAddIcon/>
                                    </IconButton>
                                    <IconButton onClick={(e)=>onDelete(e)}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                </div> 
                            </div>
                                { open && 
                                    <CreateCategoryForm handleCancel={handleCancel} handleClose={onClose}/>
                                }
                        </div> 
                        <div className="view-details with-items">
                            {categories.map((category, i) => {
                                return <CategoryComponent 
                                    key={i}
                                    category={category} 
                                    setCategoryId={setCategoryId}
                                />                  
                            })}
                        </div>    
                    </>
                }
            </>
        )
    }  


export default Categories;

