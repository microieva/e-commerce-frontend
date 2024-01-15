import { IconButton } from "@mui/material";
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface Props {
    text: string
    handleCancel: ()=> void,
    handleConfirm: ()=> void
}

const Alert = ({handleCancel, handleConfirm, text}: Props) => {
    return (
        <div className="alert-container">
            <h2>{text}</h2>
            <div className="btn-group">
                <IconButton onClick={handleConfirm}>
                    <ThumbUpIcon/>
                </IconButton>
                <IconButton onClick={handleCancel}>
                    <DoorBackOutlinedIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Alert;