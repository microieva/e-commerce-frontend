import { IconButton } from "@mui/material";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import Button from "./button";

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
                {/* <IconButton onClick={handleCancel}>
                    <DoorBackOutlinedIcon/>
                </IconButton>
                <IconButton onClick={handleConfirm} style={{color: 'orange'}}>
                    <PersonOffIcon/>
                </IconButton> */}
                <Button text={'cancel'} onClick={handleCancel} width="8rem" height="2rem"/>
                <Button text={'delete'} onClick={handleConfirm} width="8rem" height="2rem"/>
            </div>
        </div>
    )
}

export default Alert;