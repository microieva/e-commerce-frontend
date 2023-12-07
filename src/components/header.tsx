import { FC, useEffect, useState } from 'react';

import { IconButton, ThemeProvider, Backdrop, Dialog, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { marineTheme } from '../shared/theme';
import { useAppSelector } from '../hooks/useAppSelector';
import FormProvider from '../contexts/form';

import Button from './button';
import FormSwitcher from './form-switcher';
import { TypeForm } from '../@types/types';
import { User } from '../@types/user';
import { Link, Outlet } from 'react-router-dom';
import { useLazyGetUserQuery } from '../redux/api-queries/auth-queries';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { clearUser, setUser } from '../redux/app-reducers/user';


const Header: FC = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    //const { data, refetch } = useGetUserQuery(token, {skip: !token});

    const [ trigger, result ] = useLazyGetUserQuery();
    //const user = useAppSelector((state) => state.user.data);
    
    const [ admin, setAdmin ] = useState<boolean>(false);
    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(undefined);
    
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);

    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr + item.quantity, 0);

    //const dispatch = useAppDispatch();

    /*PLAN:

    - try const [ data, trigger ] = useLazyGetUserQuery();
    call trigger in effect & handleclose ?
    */


    const handleOpen = (form: TypeForm) => {
        setOpen(true);
        setForm(form);
    }

    const handleClose = () => {
        setOpen(false);
        setToken(localStorage.getItem('token') || '');
        //trigger(token);
        /*trigger(token, false)
            .unwrap()
            .then(user => setLoggedInUser(user))
            .catch(() => setLoggedInUser(undefined))
            .finally(() => console.log('ON CLOSE loggedInUser : ', loggedInUser));*/
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        setLoggedInUser(undefined);
        //trigger('');
    }

    useEffect(() => {
        // Retrieve user on startup
        setToken(localStorage.getItem('token') || '');
        trigger(token, false)
            .unwrap()
            .then(user => setLoggedInUser(user))
            .catch(() => setLoggedInUser(undefined))
            .finally(() => console.log('EFFECT loggedInUser : ', loggedInUser));
        
        if (loggedInUser && loggedInUser.role === "ADMIN") {
            setAdmin(true);
        }
    }, [loggedInUser]);
    console.log(' ------- result.data: ', result.data);

    return (
        <header>
            { loggedInUser ? <h2>Hello, {loggedInUser.name}</h2> : <h2>products</h2>}
            <div className='header-group'>
                <div className='btn-group'>
                    { !loggedInUser ? 
                        <>
                            <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                            <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                        </>
                        :
                        <>
                            <IconButton onClick={onLogout}>
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