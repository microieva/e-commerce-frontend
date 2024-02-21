import { FC, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IconButton, Backdrop, Dialog, Badge, Box, List, ListItem } from '@mui/material';
import RoofingIcon from '@mui/icons-material/Roofing';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import {ThemeContext} from '../../contexts/theme';
import FormProvider from '../../contexts/form';
import { SnackBarContext } from '../../contexts/snackbar';
import FormSwitcher from '../views/inner-components/form-switcher';
import Button from './button';
import { TypeForm, TypeSnackBarContext } from '../../@types/types';
import { User } from '../../@types/user';


const Header: FC = () => {
    const [state, setState] = useState({mobileView: false});
    const { mobileView } = state;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    const { data } = useGetUserQuery(token);
    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(data);
    
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);

    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;

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
        setSnackBar({message: 'Logged out', open: true});
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
            { !mobileView &&
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
            }
            { loggedInUser ? <h1>hello, {loggedInUser.name}</h1> : <h1>random shop</h1>}
            <div className='btn-group'> 
                {mobileView ? 
                    <>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            anchor="right"
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            onOpen={handleOpenMenu}
                            className="drawer"
                        >
                            <Box
                                role="presentation"
                                onClick={handleCloseMenu}
                                onKeyDown={handleCloseMenu}
                            >
                                <List>
                                    <ListItem onClick={()=>navigate(`/`)}>
                                        <RoofingIcon /> 
                                        <span>home</span>
                                    </ListItem>
                                    { !loggedInUser ? 
                                        <>
                                            <ListItem onClick={()=> handleOpen('signup')}>
                                                <PersonAddAltIcon/> 
                                                <span>sign up</span>
                                            </ListItem>
                                            <ListItem onClick={()=>handleOpen('login')}>
                                                <LoginIcon /> 
                                                <span>log in</span>
                                            </ListItem>
                                        </>
                                        :
                                        <>
                                            <ListItem onClick={()=>navigate(`/auth/profile`)}>
                                                <AccountCircleOutlinedIcon /> 
                                                <span>profile</span>
                                            </ListItem>
                                            <ListItem onClick={onLogout}>
                                                <LogoutOutlinedIcon />
                                                <span>log out</span>
                                            </ListItem>
                                        </>
                                    } 
                                    { loggedInUser?.role !== "ADMIN" && 
                                        <ListItem onClick={()=>navigate(`/cart`)}>
                                            <ShoppingCartOutlinedIcon />
                                            <span>cart ({cart.length})</span> 
                                        </ListItem>
                                    }
                                    <ListItem onClick={handleThemeChange}>
                                        {
                                            theme === 'light' ?<DarkModeIcon />:<LightModeIcon />
                                        }
                                            <span>switch theme</span>
                                    </ListItem>   
                                </List>
                            </Box>
                        </SwipeableDrawer>
                    </>
                    :
                    <>
                        { !loggedInUser ? 
                            <>
                                <Button text="sign up" onClick={()=> handleOpen('signup')} />
                                <Button text="log in" onClick={()=>handleOpen('login')} />
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
            <FormProvider form={form} onClose={handleClose}>
                <Dialog fullWidth open={open} onClose={handleClose} >
                    <FormSwitcher />
                </Dialog>
                <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
            </FormProvider>
            <Outlet />
        </header>
    )
}

export default Header;