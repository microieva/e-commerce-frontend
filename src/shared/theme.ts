import { createTheme } from '@mui/material/styles';

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


