import { FC } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from './contexts/user';
import HomePage from './pages/home-page';
import ProfilePage from './pages/profile-page';
import ProductPage from './pages/product-page';
import ProductFormPage from './pages/product-form-page';
import CartPage from './pages/cart-page';

const App: FC = () => {

    return (
        <UserProvider>
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
        </UserProvider>
    )
}

export default App;