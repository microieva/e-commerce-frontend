// import { useContext } from "react";
// import { ThemeContext, themes } from "../contexts/theme";


// const useThemeToggle = () => {
//     const [ theme, setTheme ] = useContext<string | null>(ThemeContext);
//     // Define a function to toggle the theme
//     const toggleTheme = () => {
//       const newTheme = theme === themes.light ? themes.dark : themes.light;
//       setTheme(newTheme);
//       localStorage.setItem("theme", newTheme);
//     };
//     return toggleTheme;
//   };


//   // Create a custom hook to use the theme
// const useTheme = () => {
//   // Get the theme value from the context
//   const theme = useContext(ThemeContext);
//   // Return the theme value
//   return theme;
// };

// export { useThemeToggle, useTheme };

import { useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeContext } from "../contexts/theme";

export const useTheme = () => {
    const { theme } = useContext(ThemeContext);

    const t = useMemo(() => createTheme({
        palette: {},
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
          }
        }
      }), [theme]);
}
