
import { Divider, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../@types/product';
import { useDeleteCategoryMutation } from '../redux/api-queries/category-queries';
import CategoryComponent from './category';

interface Props {
    categories: Category[],
    handleDeleteCategories: ()=>Promise<void>
}


const Categories = ({ categories, handleDeleteCategories }: Props) => {
    const [ deleteCategory, { data, error }] = useDeleteCategoryMutation();
    const [ lastCategory, setLastCategory ] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDeleteCategory = async (categoryId: string) => {
        if (categoryId) {       
            await deleteCategory({categoryId, token: localStorage.getItem('token') || ''});
            if (categories.length === 1) {
                setLastCategory(true);
            }  
        }
    }
    const handleCreateCategory = async () => {
        console.log('will go to form view to create')
    }

    useEffect(()=> {
        navigate('/auth/profile');
    }, [data])

        return (
            <>
                {!lastCategory &&
                    <>
                        <Divider />
                        <div className='view-header' style={{marginTop: "1rem"}}>
                            <h2>categories</h2>
                            <div className='btn-group'>
                                <IconButton onClick={()=>handleDeleteCategories()}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </div> 
                        </div> 
                        <div className="orders">
                                {categories.map(category => {
                                    return <CategoryComponent 
                                        category={category} 
                                        handleDelete={handleDeleteCategory}
                                        handleCreate={handleCreateCategory}
                                    />                  
                                })}
                            </div>    
                    </>
                }
            </>
        )
    }  


export default Categories;

