import { FC } from 'react';
import { ButtonProps } from '../../@types/types';

const Button: FC<ButtonProps> = ({text, width, height, onClick, disabled}) => {
  return (
    <button 
        disabled={disabled}
        className="btn" 
        id={disabled ? "btn-disabled" : ""}
        style={{width: `${width}`, height: `${height}`}} 
        onClick={()=>onClick()}
    >
        {text}
    </button>
  )
}

export default Button;