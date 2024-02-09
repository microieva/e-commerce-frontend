import { FC, useContext, useEffect, useState } from 'react';

import { IconButton, ThemeProvider, Backdrop, Dialog, Badge } from '@mui/material';
import RoofingIcon from '@mui/icons-material/Roofing';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useAppSelector } from '../../hooks/useAppSelector';
import FormProvider from '../../contexts/form';

import Button from './button';
import FormSwitcher from '../views/inner-components/form-switcher';
import { TypeForm } from '../../@types/types';
import { User } from '../../@types/user';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import {ThemeContext} from '../../contexts/theme';


const Header: FC = () => {
    const [state, setState] = useState({mobileView: false});
    const { mobileView } = state;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data } = useGetUserQuery(token);
    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(data);
    
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);

    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr + item.quantity, 0);
    const navigate = useNavigate();

    const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark');
  };

    const handleOpen = (form: TypeForm) => {
        setOpen(true);
        setForm(form);
    }

    const handleClose = () => {
        setOpen(false);
        setToken(localStorage.getItem('token') || '');
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        setLoggedInUser(undefined);
        window.dispatchEvent(new Event('storage'))
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 700
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        }
      }, []);

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem('token') || '');
        }
        data && setLoggedInUser(data);

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [data]);

    return (
        <header>
            <div className='btn-group'>
                {
                    theme === 'light' ?
                    <IconButton onClick={handleThemeChange}
                        sx={{
                            '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                {
                                    backgroundColor: "rgb(61,61,61, 0.2)"
                                }
                        }}
                    >
                        <DarkModeIcon />
                    </IconButton>
                    :
                    <IconButton onClick={handleThemeChange}
                        sx={{
                            '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                {
                                    backgroundColor: "rgb(61,61,61, 0.2)"
                                }
                        }}
                    >
                    <LightModeIcon />
                    </IconButton>
                }
               
            </div>
            { loggedInUser ? <h2>hello, {loggedInUser.name}</h2> : <h2>random shop</h2>}
            <div className='btn-group'> 
                {mobileView ? 
                    <>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={()=>navigate(`/`)}>home</MenuItem>
                        { !loggedInUser ? 
                            <>
                                <MenuItem onClick={()=> handleOpen('signup')}>signup</MenuItem>
                                <MenuItem onClick={()=>handleOpen('login')}>login</MenuItem>
                            </>
                            :
                            <>
                                <MenuItem onClick={()=>navigate(`/auth/profile`)}>profile</MenuItem>
                                <MenuItem onClick={onLogout}>logout</MenuItem>
                            </>
                        }
                        <>
                            { loggedInUser?.role !== "ADMIN" && 
                                <MenuItem onClick={()=>navigate(`/cart`)}>cart ({cart.length})</MenuItem>
                            }
                        </>
                    </Menu>
                    </>
                    :
                    <>
                        { !loggedInUser ? 
                            <>
                                <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                                <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                            </>
                            :
                            <>
                                <IconButton 
                                    onClick={onLogout}
                                    sx={{
                                        '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                            {
                                                backgroundColor: "rgb(61,61,61, 0.2)"
                                            }
                                    }}
                                >
                                    <LogoutOutlinedIcon />
                                </IconButton> 
                                <Link to={`/auth/profile`}>
                                    <IconButton 
                                        id="profile-icon"
                                        sx={{
                                            '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                                {
                                                    backgroundColor: "rgb(61,61,61, 0.2)"
                                                }
                                        }}
                                    >
                                        <AccountCircleOutlinedIcon />
                                    </IconButton>
                                </Link>    
                            </>
                        }
                        <Link to={`/`}>
                            <IconButton 
                                sx={{
                                    '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                        {
                                            backgroundColor: "rgb(61,61,61, 0.2)"
                                        }
                                }}
                            >
                                <RoofingIcon />
                            </IconButton>
                        </Link>   
                        {loggedInUser?.role !== "ADMIN" && 
                            <Link to='/cart'>
                                <IconButton
                                    sx={{
                                        '&.MuiButtonBase-root.MuiIconButton-root:hover': 
                                            {
                                                backgroundColor: "rgb(61,61,61, 0.2)"
                                            }
                                    }}
                                >
                                    <Badge 
                                        overlap="circular" 
                                        badgeContent={amount}
                                    >
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                </IconButton>
                            </Link>
                        }
                    </>
                }
            </div>
            <ThemeProvider theme={theme}>
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