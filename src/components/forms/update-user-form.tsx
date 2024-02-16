import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl } from '@mui/material';

import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Loading from '../shared/loading';
import { User } from '../../@types/user';
import { useUpdateUserMutation } from '../../redux/api-queries/user-queries';
import Button from '../shared/button';
import { SnackBarContext } from '../../contexts/snackbar';
import { TypeSnackBarContext } from '../../@types/types';

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

    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const navigate = useNavigate();

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
        validate(obj);
        if (!err) {
            if (password !== undefined) {
                setUpdates({...obj, password});
            } else {
                setUpdates(obj);
            }
        }
    }

    useEffect(() => {
        const obj = {
            name,
            email,
            avatar: avatar ? avatar : "https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315_1280.jpg"
        };
        validate(obj);
        err && setDisabled(false);
    }, [ name, email, avatar ])

    useEffect(()=> {
        const submit = async() => {
            if (updates) {
                try {
                    await updateUser({ token: localStorage.getItem('token') || '', body: updates, _id: user?._id});
                    setSnackBar({message: "Information saved", open: true});
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
        if (data) {
            setDisabled(true);
        }
    }, [data]);

    useEffect(()=> {
        if (!admin) {
            setDisabled(true);
        }
    }, [admin])

    const validate = (obj: any) => {
        //setErr(titleError && priceError && descriptionError);
        //temporary : 
        const foundUndefined = Object.values(obj).some(value => value === undefined);
        setErr(foundUndefined);
    }

    const onCancel =() => {
        setAdmin(user.role === "ADMIN");
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
        setPassword(undefined);
        setIsChangingPassword(false);
        
        setErr(false);
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
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={disabled}
                        helperText="Title is required"
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={disabled}
                        helperText="Price is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: emailError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setEmailError(false)}
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
                        helperText="Image must be a valid internet link"
                        onChange={(e) => setAvatar(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
                    <Button width={"10rem"} disabled={disabled} text="Change Password" onClick={()=> setIsChangingPassword(true)}/>
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
                                    disabled={err}
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