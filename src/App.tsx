import { FC, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomePage from './pages/home-page';
import ProfilePage from './pages/profile-page';
import ProductPage from './pages/product-page';
import ProductFormPage from './pages/product-form-page';
import CartPage from './pages/cart-page';
import { ThemeContext } from './contexts/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { getThemePalette } from './shared/getThemePallete';
import { SnackBarProvider } from './contexts/snackbar';
import { AlertProvider } from './contexts/alert';

const App: FC = () => {
    const isBrowserDefaulDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getDefaultTheme = (): string => {
        const localStorageTheme = localStorage.getItem('default-theme');
        const browserDefault = isBrowserDefaulDark() ? 'dark' : 'light';
        return localStorageTheme || browserDefault;
    };

    const [theme, setTheme] = useState<string>(getDefaultTheme());

    const selectedTheme = useMemo(() => createTheme(getThemePalette(theme as PaletteMode)), [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <AlertProvider>
            <SnackBarProvider>
              <div className={`theme-${theme}`}>  
                <div className='app-container'>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/products/new" element={<ProductFormPage />} /> 
                            <Route path="/products/:productId" element={<ProductPage />} /> 
                            <Route path="/auth/profile" element={<ProfilePage />}/>
                            <Route path="/cart" element={<CartPage />}/>
                            <Route path="/" element={<HomePage />}/>
                        </Routes>
                    </BrowserRouter>
                </div>
              </div> 
            </SnackBarProvider>
            </AlertProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default App;
