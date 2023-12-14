import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: FC = () => {
  return (
    <Box sx={{ display: 'flex', margin: 'auto', '& .MuiCircularProgress-root': {color: 'darkgrey'} }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;