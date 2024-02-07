import { FC, useContext, useEffect, useState } from 'react';

import { IconButton, ThemeProvider, Backdrop, Dialog, Badge, FormGroup, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import RoofingIcon from '@mui/icons-material/Roofing';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { orangeTheme } from '../../shared/theme';
import { useAppSelector } from '../../hooks/useAppSelector';
//import { useThemeToggle } from '../../hooks/useTheme';
import FormProvider from '../../contexts/form';

import Button from './button';
import FormSwitcher from '../views/inner-components/form-switcher';
import { TypeForm, TypeThemeContext } from '../../@types/types';
import { User } from '../../@types/user';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/api-queries/auth-queries';
import {ThemeContext} from '../../contexts/theme';


const Header: FC = () => {
    const [state, setState] = useState({mobileView: false});
    //const { theme, toggleTheme } = useTheme();
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

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
          margin: 1,
          padding: 0,
          transform: 'translateX(6px)',
          '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
              )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
          width: 32,
          height: 32,
          '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
          },
        },
        '& .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
          borderRadius: 20 / 2,
        },
    }));

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
             <FormGroup>
                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 4 }} checked={theme === 'light'} onChange={handleThemeChange}/>}
                    label=""
                />
            </FormGroup>
            { loggedInUser ? <h2>hello, {loggedInUser.name}</h2> : <h2>random shop</h2>}
            <div className='header-group'> 
                {mobileView ? 
                    <div className="btn-group">
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
                    </div>
                    :
                    <div className='btn-group'>
                        { !loggedInUser ? 
                            <div className='btn-group' style={{alignSelf: "center"}}>
                                <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                                <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                            </div>
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
                                        '&.MuiButtonBase-root.MuiIconButton-root:not(svg):hover': 
                                            {
                                                backgroundColor: "rgb(61,61,61, 0.2)"
                                            }
                                    }}
                                >
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
                            </Link>
                        }
                    </div>
                }
            </div>
            <ThemeProvider theme={orangeTheme}>
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