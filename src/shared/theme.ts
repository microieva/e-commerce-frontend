import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

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
const lightTheme = createTheme({
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
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiSvgIcon-root' : {
    //         color: 'orange'
    //       }
    //     }
    //   }
    // }
  },
});

/*const theme = useMemo(() =>
createTheme({
    palette: {
        type: 'body',
        background: {
        // dark: "hsl(230, 17%, 14%)",
        // light: "hsl(0, 0%, 100%)"
        dark: "#272a2e",
        light: "white"
        }
    }
    }),
[mode]
);*/


export { lightTheme };


