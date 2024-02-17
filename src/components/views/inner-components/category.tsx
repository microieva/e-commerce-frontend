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
    const handleClose = ()=> {
        setIsUpdating(false)
    }

    return (
        <div className="category-container">
            <div className="view-header" style={{margin: isUpdating ? "1rem 0":0, justifyContent: isUpdating ? "flex-end": "inherit"}}>
                {!isUpdating && <div style={{display: "flex", alignItems: 'center'}}>
                    <img src={category.image}/>
                    <h2>{category.name.toLowerCase()}</h2> 
                </div>}
                <div className="btn-group" style={{float: isUpdating ? "right": "none"}}>
                    <IconButton  disabled={isUpdating} onClick={handleEdit}>
                        <EditNoteIcon/>
                    </IconButton>
                    <IconButton  onClick={()=>handleDelete(category._id)}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </div>  
            </div>
            {isUpdating && <UpdateCategoryForm category={category} onClose={handleClose}/>}   
        </div> 
    )
}

export default CategoryComponent;