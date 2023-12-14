import { FC } from "react"
import { Divider, IconButton } from "@mui/material"
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom"

export const ProfileProductsPlaceholder: FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Divider />
            <div className='view-header' style={{margin: "6rem 0"}}>
                <h2>products</h2>
                <div className='btn-group'>
                    <IconButton onClick={()=> navigate("/products/new")}>
                        <PlaylistAddOutlinedIcon />
                    </IconButton> 
                    <IconButton onClick={()=>console.log('Ei.')}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </div> 
            </div> 
        </>
    )
}
