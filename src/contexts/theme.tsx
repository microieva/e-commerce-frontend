// import React, { FC, ReactNode, createContext, useContext, useMemo } from "react";

// // Define the theme colors using sass variables
// // $light-color: #f0f0f0;
// // $dark-color: #202020;
// // $primary-color: #61dafb;

// // Create a theme context with a default value
// export const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// });

// // Create a custom hook to use the theme context
// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider:FC<ReactNode> = (children: ReactNode) => {
//   const [theme, setTheme] = React.useState("light");

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   // Use useMemo to memoize the theme context value
//   const themeContextValue = useMemo(() => {
//     return { theme, toggleTheme };
//   }, [theme]);

//   // Return the theme provider with the memoized value
//   return (
//     <ThemeContext.Provider value={themeContextValue}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// //THIS: 
// //import { useTheme } from "./ThemeContext"; - in scss file
// //@include theme(useTheme().theme);

import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  setTheme: (theme: string) => {},
});
