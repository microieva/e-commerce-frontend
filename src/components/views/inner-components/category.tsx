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
    const [ open, setOpen ] = useState<boolean>(false);
    const { setAlert } = useContext(AlertContext) as TypeAlertContext;

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = ()=> {
        setOpen(false)
    }
    const onDelete = () => {
        setCategoryId(category._id);
        setAlert({text: `Delete category "${category.name}"?`, open: true, action: "isDeletingCategory"});
    }

    return (
        <div className="flex-container" id={open ? "open" : ""}>
            {!open && 
                <div style={{display: "flex", alignItems: 'center', width: "auto"}}>
                    <img src={category.image}/>
                    <h2 style={{textIndent: "2rem"}}>{category.name.toLowerCase()}</h2> 
                </div>    
            }
            <div className="btn-group" style={{float: open ? "right": "none"}}>
                <IconButton  disabled={open} onClick={handleOpen}>
                    <EditNoteIcon/>
                </IconButton>
                <IconButton  onClick={onDelete}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </div>  
            {open && <UpdateCategoryForm category={category} onClose={handleClose}/>}   
        </div> 
    )
}

export default CategoryComponent;