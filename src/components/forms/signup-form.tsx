import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useCreateUserMutation } from '../../redux/api-queries/auth-queries';
import { FormContext } from '../../contexts/form';
import { TypeFormContext, TypeSnackBarContext } from '../../@types/types';
import { User } from '../../@types/user';
import { SnackBarContext } from '../../contexts/snackbar';


const SignupForm = () => {
    const [newUser, setNewUser] = useState<Partial<User>>();
     
    const [ name, setName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ avatar, setAvatar ] = useState<string>('');

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const [ repeatPasswordError, setRepeatPasswordError ] = useState<boolean>(false);
    const [ avatarError, setAvatarError ] = useState<boolean>(false);

    const { onClose } = useContext(FormContext) as TypeFormContext;
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;

    const [ createUser, { error }] = useCreateUserMutation();
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);

    const nameRegex = new RegExp('^[a-zA-Z]+$');
    const passWordRegex = new RegExp('^[a-zA-Z0-9]{6,}');
    const emailRegex = new RegExp('^(?:[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2})');
    const avatarRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setNameError(!nameRegex.test(event.target.value));
        setName(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPasswordError(!passWordRegex.test(event.target.value))
        setPassword(event.target.value);
    }
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value.length >=password.length) {
            setRepeatPasswordError(event.target.value !== password);

        }
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAvatarError(!avatarRegex.test(event.target.value));
        setAvatar(event.target.value);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name,
            email,
            password,
            avatar: avatar !== '' ? avatar : 'https://api.lorem.space/image/face?w=640&h=480&r=867'
        }
        setNewUser(user);
        onClose();
    };

    useEffect(()=> {
        if (
            name !== '' && !nameError &&
            password !== '' && !passwordError && 
            email !== '' && !emailError 
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, nameError, password, passwordError, email, emailError]);

    useEffect(()=> {
        const signup = async () => {
            if (newUser) {
                try {
                    const token = newUser && await createUser(newUser).unwrap();
                    token && setSnackBar({message: "Welcome!..", open: true});
                    token && localStorage.setItem('token', JSON.stringify(token));
                    window.dispatchEvent(new Event('storage'))
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        signup();
    }, [newUser]);

    return (
        <div className='form-container login-signup-form'>
            <h2>create account</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        onChange={handleNameChange}
                        onBlur={(event)=> setNameError(!nameRegex.test(name))}
                        required
                        helperText={name==='' ? "Name is required" : "Name should be letters only"}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: nameError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
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
                        type="email"
                        onChange={handleEmailChange}
                        onBlur={(event)=> setEmailError(!emailRegex.test(email))}
                        required
                        helperText={email==='' ? "Email is required" : "Must be a valid email address"}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: emailError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>setEmailError(false)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={handlePasswordChange}
                        onBlur={(event)=> setPasswordError(event.target.value === '')}
                        required
                        helperText="Password must be min 6 characters"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: passwordError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>setPasswordError(false)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Repeat Password"
                        name="password"
                        type="password"
                        onChange={handleRepeatPasswordChange}
                        //onBlur={(event)=> setPasswordError(!passWordRegex.test(event.target.value))}
                        required
                        helperText="Unmatching password"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: repeatPasswordError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>setRepeatPasswordError(false)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Avatar"
                        name="avatar"
                        onChange={handleAvatarChange}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: avatarError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        helperText="Avatar must be a valid internet link"
                        onFocus={()=> setAvatarError(false)}
                    />
                </FormControl> 
                <div className='btn-group'>
                    <IconButton type ="submit" disabled={disabled}>
                        <BackupOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={()=> onClose()}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </form>
        </div>
    
    );
}

export default SignupForm;

