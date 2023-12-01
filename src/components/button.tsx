import { FC } from 'react';
import { ButtonProps } from '../@types/types';

const Button: FC<ButtonProps> = ({text, width, height, onClick}) => {
  return (
    <button className="btn" style={{width: `${width}`, height: `${height}`}} onClick={()=>onClick()}>{text}</button>
  )
}

export default Button;