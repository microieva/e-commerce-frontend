
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton, ThemeProvider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useDeleteCategoryMutation } from '../redux/api-queries/category-queries';
import CategoryComponent from './category';
import { Category } from '../@types/product';
import CreateCategoryForm from './create-category-form';
import { orangeTheme } from '../shared/theme';

interface Props {
    categories: Category[],
    handleDeleteCategories: ()=>Promise<void>
}


const Categories = ({ categories, handleDeleteCategories }: Props) => {
    const [ deleteCategory, { data, error }] = useDeleteCategoryMutation();
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
    const handleCancel = () => {
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
                        <Divider />
                        <div className='view-header' style={{marginTop: "6rem", flexDirection:"column"}}>
                            <div className="view-header-wrapper">
                                <h2>categories</h2>
                                <div className='btn-group'>
                                    <IconButton  disabled={disabled} onClick={()=> setOpen(true)}>
                                        <PlaylistAddIcon/>
                                    </IconButton>
                                    <IconButton onClick={()=>handleDeleteCategories()}>
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
                                {categories.map(category => {
                                    return <CategoryComponent 
                                        category={category} 
                                        handleDelete={handleDeleteCategory}
                                    />                  
                                })}
                            </div>    
                    </>
                }
            </>
        )
    }  


export default Categories;

