

// //THIS: 
// //import { useTheme } from "./ThemeContext"; - in scss file
// //@include theme(useTheme().theme);

import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  setTheme: (theme: string) => {},
});
