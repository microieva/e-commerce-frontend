import { useEffect, useState, MouseEvent, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, Dialog, Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useDeleteCategoriesMutation, useDeleteCategoryMutation } from '../../../redux/api-queries/category-queries';
import CategoryComponent from './category';
import { Category } from '../../../@types/product';
import CreateCategoryForm from '../../forms/create-category-form';
import {ThemeContext} from '../../../contexts/theme';
import Alert from '../../shared/alert';

interface Props {
    categories: Category[]
}


const Categories = ({ categories }: Props) => {
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const [ deleteCategory, { data, error }] = useDeleteCategoryMutation();
    const [ deleteCategories, { data: deleteAllCategoriesData, error: deleteAllCategoriesError, isLoading}] = useDeleteCategoriesMutation();
    const [ lastCategory, setLastCategory ] = useState<boolean>(false);
    const navigate = useNavigate();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ disabled, setDisabled ] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);

    const handleDeleteCategory = async (categoryId: string) => {
        if (categoryId) {       
            await deleteCategory({categoryId, token: localStorage.getItem('token') || ''});
            if (categories.length === 1) {
                setLastCategory(true);
            }  
        }
    }
    const onDelete = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleting(true);
    }
    const handleCancel = () => {
        setOpen(false);
        setDisabled(false);
    }

    const handleClose = () => {
        setIsDeleting(false);
    }
    const handleDelete = async () => {
        await deleteCategories(localStorage.getItem('token') || '');
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
                                    <CreateCategoryForm handleCancel={handleCancel}/>
                                }
                        </div> 
                        <div className="profile-section">
                            {categories.map((category, i) => {
                                return <CategoryComponent 
                                    key={i}
                                    category={category} 
                                    handleDelete={handleDeleteCategory}
                                />                  
                            })}
                        </div>    
                    </>
                }
                { isDeleting &&
                    <>
                        <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                            <Alert 
                                text={`are you sure you want to delete all categories from the system permanently?`}
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


export default Categories;

