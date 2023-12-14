import { IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateCategoryForm from './create-category-form';
import { Category } from "../@types/product";

interface Props {
    category: Category,
    handleDelete: (categoryId: string) => Promise<void>
}

const CategoryComponent = ({category, handleDelete}: Props) => {

    return (
        <div className="category-container">
            <div style={{display: "flex", alignItems: 'center'}}>
                <div className="category-icon"><img src={category.image}/></div>
                <h2>{category.name}</h2> 
            </div>
            <div className="btn-group">
                <IconButton  onClick={()=> console.log('snackbar update')}>
                    <EditNoteIcon/>
                </IconButton>
                <IconButton  onClick={()=>handleDelete(category._id)}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </div>     
        </div> 
    )
}

export default CategoryComponent;