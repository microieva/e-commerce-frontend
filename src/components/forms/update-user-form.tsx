import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, FormControl } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useUpdateUserMutation } from '../../redux/api-queries/user-queries';
import Loading from '../shared/loading';
import Button from '../shared/button';
import { SnackBarContext } from '../../contexts/snackbar';
import { TypeSnackBarContext } from '../../@types/types';
import { User } from '../../@types/user';

interface Props {
    user: User
}

const UpdateUserForm: FC<Props> = ({ user }) => {
    const [ admin, setAdmin ] = useState<boolean>(user.role === "ADMIN")
    const [ email, setEmail ] = useState<string>(user.email);
    const [ name, setName ] = useState<string>(user.name);
    const [ avatar, setAvatar ] = useState<string>(user.avatar);
    const [ password, setPassword ] = useState<string | undefined>(undefined);
    
    const [ updates, setUpdates ] = useState<Partial<User>>();

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ avatarError, setAvatarError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const [ repeatPasswordError, setRepeatPasswordError ] = useState<boolean>(false);
    const [ isChangingPassword, setIsChangingPassword ] = useState<boolean>(false);

    const [ updateUser, {data, error, isLoading} ] = useUpdateUserMutation();

    const formRef = useRef<HTMLFormElement>(null);
    const valuesRef = useRef<User>(user);
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const [ allowToSubmit, setAllowToSubmit ] = useState<boolean>(false);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const navigate = useNavigate();

    const passWordRegex = new RegExp('^[a-zA-Z0-9]{6,}');
    const emailRegex = new RegExp('^(?:[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2})');
    const avatarRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');



    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        let isValid: boolean = true;
        for (let i=0; i<=event.target.value.length-1; i++) {
            isValid = isNaN(Number(event.target.value.charAt(i))) || event.target.value.charAt(i) === " "
        }
        
        setNameError(!isValid);
        setName(event.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAvatarError(!avatarRegex.test(event.target.value));
        setAvatar(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPasswordError(!passWordRegex.test(event.target.value))
        setPassword(event.target.value);
    }
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (password && event.target.value.length >= password.length) {
            setRepeatPasswordError(event.target.value !== password);

        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj = {
            name,
            email,
            avatar: avatar ? avatar : "https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315_1280.jpg",
        };
        if (password !== undefined) {
            setUpdates({...obj, password});
        } else {
            setUpdates(obj);
        }
    }
    useEffect(() => {
        valuesRef.current = user;
    });
    useEffect(()=> {
        if (disabled) {
            setNameError(false);
            setPasswordError(false);
            setEmailError(false);
            setAvatarError(false);
        }
    }, [disabled]);

    useEffect(()=> {
        const prevValues= {
            name: valuesRef.current.name,
            password:  valuesRef.current.password,
            email: valuesRef.current.email,
            avatar: valuesRef.current.avatar,
        }
        const currentValues = {
            name,
            password,
            email,
            avatar
        }
        const prev = Object.values(prevValues).toString();
        const curr = Object.values(currentValues).toString();
        const isError = nameError || emailError || passwordError || avatarError;
 
        if (prev !== curr && !isError) {
            setAllowToSubmit(true);
        } else {
            setAllowToSubmit(false);
        }
    }, [[name, email, password, avatar]]);

    useEffect(()=> {
        const submit = async() => {
            if (updates) {
                try {
                    await updateUser({ token: localStorage.getItem('token') || '', body: updates, _id: user?._id});
                    setSnackBar({message: "Information saved", open: true});
                    setDisabled(true);
                    if (updates.password !== undefined) {
                        localStorage.removeItem('token');
                        navigate('/');
                        setSnackBar({message: "Please login ..", open: true});
                    }
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        submit();
    }, [updates]);

    useEffect(()=> {
        if (!admin) {
            setDisabled(true);
        }
    }, [admin]);

    const onCancel =() => {
        setAdmin(user.role === "ADMIN");
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
        setPassword(undefined);
        setIsChangingPassword(false);
        
        setDisabled(true);
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='form-container product-form' style={{margin: "0"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        onBlur={()=>setNameError(name.length<1)}
                        required
                        disabled={disabled}
                        helperText={name==='' ? "Name is required":"Name must contain letters only"}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: nameError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setNameError(false)} 
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={()=>email && setEmailError(!emailRegex.test(email) || email === '')}
                        required
                        disabled={disabled}
                        helperText={email === '' ? "Email is required": "Must be a valid email address"}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: emailError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Avatar"
                        name="avatar"
                        type="text"
                        value={avatar}
                        disabled={disabled}
                        helperText="Avatar must be a valid internet link"
                        onChange={handleAvatarChange}
                        onBlur={()=>avatar && setAvatarError(!avatarRegex.test(avatar))}
                        sx={{
                            '& .MuiFormHelperText-root': {
                            visibility: avatarError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=> setAvatarError(false)}
                    />
                </FormControl> 
                {isChangingPassword ? 
                    <>
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="**********"
                                disabled={disabled}
                                helperText="Password is required"
                                onChange={handlePasswordChange}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                    visibility: passwordError ? 'visible' : 'hidden',
                                    transition: 'visibility 0.2s ease-in',
                                    },
                                    '& .MuiInputBase-root.MuiInput-root:before': { 
                                        borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                                    }
                                }}
                                onFocus={()=> setPasswordError(false)}
                            />
                        </FormControl> 
                        <FormControl fullWidth>
                            <TextField
                                fullWidth
                                variant="standard"
                                label="Repeat Password"
                                name="password"
                                type="password"
                                placeholder="**********"
                                disabled={disabled}
                                helperText="Unmatching password"
                                onChange={handleRepeatPasswordChange}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                    visibility: repeatPasswordError ? 'visible' : 'hidden',
                                    transition: 'visibility 0.2s ease-in',
                                    },
                                    '& .MuiInputBase-root.MuiInput-root:before': { 
                                        borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                                    }
                                }}
                                onFocus={()=> setRepeatPasswordError(false)}
                            />
                        </FormControl> 
                    </>
                    :
                    <Button 
                        width="100%" 
                        disabled={disabled} 
                        text="Change Password" 
                        onClick={()=> setIsChangingPassword(true)}
                    />
                }
                <div className='btn-group'>  
                   
                        <>
                            { disabled && 
                                <IconButton type ="button" onClick={()=> setDisabled(false)}>
                                    <EditNoteIcon />
                                </IconButton>
                            }
                            {
                            !disabled && 
                                <>
                                    <IconButton 
                                    type ="submit" 
                                    disabled={!allowToSubmit}
                                    >
                                        <BackupOutlinedIcon/>
                                    </IconButton> 
                                    <IconButton type ="button" onClick={()=> onCancel()}>
                                        <HighlightOffIcon/>
                                    </IconButton> 
                                </>
                            }
                        </>   
                    
                    
                </div>
            </form> 
        </div>
    
    );
}

export default UpdateUserForm;