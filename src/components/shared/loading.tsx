import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: FC = () => {
    return (
        <div>
            <Box className='loading' sx={{
                '& .MuiCircularProgress-root': {color: 'darkgrey'},
                '& .MuiCircularProgress-svg': {margin: 'auto'}
            }}
                >
                    <CircularProgress />
            </Box>
        </div>
    );
}

export default Loading;