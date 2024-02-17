import { IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Category } from "../../../@types/product";
import { useState } from "react";
import UpdateCategoryForm from "../../forms/update-category-form";

interface Props {
    category: Category,
    handleDelete: (categoryId: string) => Promise<void>
}

const CategoryComponent = ({category, handleDelete}: Props) => {
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false);

    const handleEdit = () => {
        setIsUpdating(true)
    }

    return (
        <div className="category-container">
                <div style={{display: "flex", alignItems: 'center'}}>
                    <img src={category.image}/>
                    <h2>{category.name}</h2> 
                </div>
                <div className="btn-group">
                    <IconButton  disabled={isUpdating} onClick={handleEdit}>
                        <EditNoteIcon/>
                    </IconButton>
                    <IconButton  onClick={()=>handleDelete(category._id)}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </div>  
            {isUpdating && <UpdateCategoryForm category={category}/>}   
        </div> 
    )
}

export default CategoryComponent;