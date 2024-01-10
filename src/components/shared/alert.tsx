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
                <Button text={'cancel'} onClick={handleCancel} width="8rem" height="2rem"/>
                <Button text={'confirm'} onClick={handleConfirm} width="8rem" height="2rem"/>
            </div>
        </div>
    )
}

export default Alert;