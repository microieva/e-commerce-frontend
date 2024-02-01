import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'MuiStat', // The component name
  slot: 'root', // The slot name
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
}));

/*const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));*/


const marineTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'aquamarine'
          },
          '&  .MuiInputBase-root.Mui-focused:after': {
            borderBottom: '2px aquamarine solid', 
          },
          '& .MuiFormHelperText-root': {
            color: 'rgb(253, 139, 51)'
          },
          '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiInput-root:before': {
            borderBottom: '1px darkgrey solid'
          }
        }
      },
    },
    MuiDialog: {
      defaultProps: {
        onClick: (e) => e.stopPropagation(),
        BackdropProps: {
          sx: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});
const orangeTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'rgb(253, 139, 51)'
          },
          '&  .MuiInputBase-root.Mui-focused:after': {
            borderBottom: '2px orange solid', 
          },
          '& .MuiFormHelperText-root': {
            color: 'rgb(253, 139, 51)'
          },
          '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiInput-root:before': {
            borderBottom: '1px darkgrey solid'
          }
        }
      },
    },
    MuiDialog: {
      defaultProps: {
        onClick: (e) => e.stopPropagation(),
        BackdropProps: {
          sx: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

export { marineTheme, orangeTheme }


