import { FC, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/home-page';
import ProfilePage from './pages/profile-page';
import ProductPage from './pages/product-page';
import ProductFormPage from './pages/product-form-page';
import CartPage from './pages/cart-page';
import { ThemeContext } from './contexts/theme';

const App: FC = () => {
    const isBrowserDefaulDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getDefaultTheme = (): string => {
        const localStorageTheme = localStorage.getItem('default-theme');
        const browserDefault = isBrowserDefaulDark() ? 'dark' : 'light';
        return localStorageTheme || browserDefault;
    };
    const [theme, setTheme] = useState(getDefaultTheme());

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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
        </ThemeContext.Provider>
    )
}

export default App;
/*
// App.js
import React from "react";
import { useTheme } from "./ThemeContext";
import "./App.scss";

// Create a functional component for the app
function App() {
  // Use the useTheme hook to get the theme context value
  const { theme, toggleTheme } = useTheme();

  // Return the JSX elements for the app
  return (
    <div className="app">
      <h1>React Theme Toggle</h1>
      <p>The current theme is {theme}</p>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch Theme
      </button>
    </div>
  );
}

export default App;
*/

/*
// Create a component to display the app content
const App = () => {
  // Use the custom hooks to get the theme and the toggle function
  const theme = useTheme();
  const toggleTheme = useThemeToggle();
  // Return the app content with the theme class and a button to toggle the theme
  return (
    <div className={theme}>
      <h1>Dark and Light Theme with React</h1>
      <p>This is a simple example of how to use React hooks and CSS variables to implement dark and light theme.</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// Render the app component wrapped with the theme provider
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);*/