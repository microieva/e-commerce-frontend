import { useEffect, useState, MouseEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, Dialog, Divider, IconButton, ThemeProvider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useDeleteCategoriesMutation, useDeleteCategoryMutation } from '../../../redux/api-queries/category-queries';
import CategoryComponent from './category';
import { Category } from '../../../@types/product';
import CreateCategoryForm from '../../forms/create-category-form';
import { marineTheme, orangeTheme } from '../../../shared/theme';
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
                        <div className='view-header' style={{marginTop: "6rem", flexDirection:"column"}}>
                            <div className="view-header-wrapper">
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
                                    <ThemeProvider theme={orangeTheme}>
                                        <CreateCategoryForm handleCancel={handleCancel}/>
                                    </ThemeProvider>
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
                        <ThemeProvider theme={marineTheme}>
                                <Dialog fullWidth open={isDeleting} onClose={handleClose} >
                                    <Alert 
                                        text={`are you sure you want to delete all categories from the system permanently?`}
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


export default Categories;

