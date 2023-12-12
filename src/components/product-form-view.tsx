import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, ThemeProvider } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import CreateProductForm from './create-product-form';
import { orangeTheme } from '../shared/theme';

const ProductFormView: FC = () => {  
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    //const history = useHistory();

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
        <>
            <div className="view-container">
                <div className='view-header'>
                    <h2>new product</h2>
                    <div className="icons">
                        {/* <IconButton type ="button" onClick={()=>history.goBack()} style={{padding: "0.8rem"}}>
                            <HighlightOffIcon/>
                        </IconButton>  */}
                        <IconButton onClick={()=> navigate('/')} style={{padding: "0.8rem"}}>
                            <DoorBackOutlinedIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className='view-details'>
                    <ThemeProvider theme={orangeTheme}>
                        <CreateProductForm />
                    </ThemeProvider>
                    <div className="img-wrapper__empty">
                        <div className="img-placeholder"/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ProductFormView;