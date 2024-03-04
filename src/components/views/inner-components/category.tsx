import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { AlertContext } from "../../../contexts/alert";
import UpdateCategoryForm from "../../forms/update-category-form";
import { TypeAlertContext } from "../../../@types/types";
import { Category } from "../../../@types/product";

interface Props {
    category: Category,
    setCategoryId: (categoryId: string) => void
}

const CategoryComponent = ({category, setCategoryId}: Props) => {
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false);
    const { setAlert } = useContext(AlertContext) as TypeAlertContext;

    const handleEdit = () => {
        setIsUpdating(true)
    }
    const handleClose = ()=> {
        setIsUpdating(false)
    }
    const onDelete = () => {
        setCategoryId(category._id);
        setAlert({text: `Delete category "${category.name}"?`, open: true, action: "isDeletingCategory"});
    }

    return (
        <div className="flex-container">
            {!isUpdating && 
                <div style={{display: "flex", alignItems: 'center'}}>
                    <img src={category.image}/>
                    <h2>{category.name.toLowerCase()}</h2> 
                </div>    
            }
            <div className="btn-group" style={{float: isUpdating ? "right": "none"}}>
                <IconButton  disabled={isUpdating} onClick={handleEdit}>
                    <EditNoteIcon/>
                </IconButton>
                <IconButton  onClick={onDelete}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </div>  
            {isUpdating && <UpdateCategoryForm category={category} onClose={handleClose}/>}   
        </div> 
    )
}

export default CategoryComponent;