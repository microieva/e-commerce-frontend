import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ProductForm from './product-form';
import { orangeTheme } from '../shared/theme';

const ProductFormView: FC = () => {  
    const goBack = useNavigate();

    return (
        <>
            <div className="view-container">
                <div className='view-header'>
                    <h2>new product</h2>
                    <div className="icons">
                        <IconButton onClick={()=> goBack('/')} style={{padding: "0.8rem"}}>
                            <DoorBackOutlinedIcon/>
                        </IconButton>
                    </div>
                    </div>
                    <div className='view-details'>
                    <ThemeProvider theme={orangeTheme}>
                        <ProductForm />
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