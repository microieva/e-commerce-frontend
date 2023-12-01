import { FC, useContext, useEffect, useState } from 'react';

import { IconButton, ThemeProvider, Backdrop, Dialog, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { marineTheme } from '../shared/theme';
import { useAppSelector } from '../hooks/useAppSelector';
import FormProvider from '../contexts/form';
import { UserContext } from '../contexts/user';
import Button from './button';
import FormSwitcher from './form-switcher';
import { TypeForm, TypeUserContext } from '../@types/types';
import { User } from '../@types/user';
import { Link, Outlet } from 'react-router-dom';

const Header: FC = () => {
    const { user, onLogout, onLogin } = useContext(UserContext) as TypeUserContext;
    const [ admin, setAdmin ] = useState<boolean>(false);

    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr+item.quantity, 0);

    const handleOpen = (form: TypeForm) => {
        setOpen(true);
        setForm(form);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(()=> {
        onLogin(); 
        setLoggedInUser(user);
        if (loggedInUser && loggedInUser.role !== 'admin' || !user) {
            setAdmin(false);
        }
        user && user.role === 'admin' && setAdmin(true);
    }, [user]);

    useEffect(()=> {
        user && user.role === 'admin' && setAdmin(true);
    }, [user])

    return (
        <header>
            { user ? <h2>Hello, {user.name}</h2> : <h2>products</h2>}
            <div className='header-group'>
                <div className='btn-group'>
                    { !user ? 
                        <>
                            <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                            <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                        </>
                        :
                        <>
                            <IconButton onClick={()=> onLogout()}>
                                <LogoutOutlinedIcon />
                            </IconButton>
                            <Link to={`/auth/profile`}>
                                <IconButton id="profile-icon">
                                    <AccountCircleOutlinedIcon />
                                </IconButton>
                            </Link>    
                        </>
                    }
                    {!admin && <Link to='/cart'>
                        <IconButton>
                            <Badge 
                                overlap="circular" 
                                badgeContent={amount}
                                sx={{
                                    "&.css-z5pebr-MuiBadge-badge": {backgroundColor: "orange"}
                                }}
                            >
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Link>}
                </div>
            </div>
            <ThemeProvider theme={marineTheme}>
                <FormProvider form={form} onClose={handleClose}>
                    <Dialog fullWidth open={open} onClose={handleClose} >
                        <FormSwitcher />
                    </Dialog>
                <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                </FormProvider>
            </ThemeProvider>
            <Outlet />
        </header>
    )
}

export default Header;