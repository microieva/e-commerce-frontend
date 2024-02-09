import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import CreateProductForm from '../forms/create-product-form';
import { ThemeContext } from '../../contexts/theme';

const ProductFormView: FC = () => {  
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(()=> {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        if (!token) {
            navigate('/');
        }
       
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [token]);

    return (
        <div className="view-wrapper">
            <div className='view-header'>
                <h2>new product</h2>
                <div className="btn-group">
                    <IconButton onClick={()=> navigate('/')} style={{padding: "0.8rem"}}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <ThemeProvider theme={theme}>
                    <CreateProductForm />
                </ThemeProvider>
                <div className="img-wrapper__empty">
                    <div className="img-placeholder"/>
                </div>
            </div>
        </div>
    )
}

export default ProductFormView;