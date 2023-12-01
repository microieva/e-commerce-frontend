import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useAddUserMutation } from '../redux/api-queries/user-queries';
import { useLoginMutation } from '../redux/api-queries/auth-queries';
import { FormContext } from '../contexts/form';
import { UserContext } from '../contexts/user';
import { TypeFormContext, TypeUserContext } from '../@types/types';
import { User } from '../@types/user';


const SignupForm = () => {
    // 'https://api.lorem.space/image/face?w=640&h=480&r=867' avatar
    const { onLogin } = useContext(UserContext) as TypeUserContext;
    const [user, setUser] = useState<Partial<User>>();
     
    const [ name, setName ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ email, setEmail ] = useState<string>();
    const [ avatar, setAvatar ] = useState<string>();

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);
    const [ avatarError, setAvatarError ] = useState<boolean>(false);

    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ addUser ] = useAddUserMutation();
    const [ login, {data, error}] = useLoginMutation();
    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name,
            email,
            password,
            avatar
        }
        setUser(user);
    };

    const loginSignupUser = async (email: string, password: string) => {
        await login({email: email, password: password});
        onLogin(); 
        onClose();
    }
    useEffect(()=> {
        data && localStorage.setItem('token', JSON.stringify(data.access_token));
    }, [data, error])

    useEffect(()=> {
        if (user) {
            validate();
        }
        const signup = async () => {
            if (!err) {
                try {
                    const payload = user && await addUser(user).unwrap();
                    payload && loginSignupUser(payload.email, payload.password);  
                } catch (error: any) {
                    setErr(true);
                }
            }
        }
        signup();
    }, [user]);

    const validate = () => {
        const nameRegex = new RegExp('^[a-zA-Z]');
        const emailRegex = new RegExp('^(?:[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2})');
        const passWordRegex = new RegExp('^[a-zA-Z0-9]{4,}');
        const avatarRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

        if (user) {
            if (user.name) {
                if (!user.name.match(nameRegex)) {
                    setNameError(true);
                }
            } else {
                setNameError(true);
            }
            if (user.email) {
                if (!user.email.match(emailRegex)) {
                    setEmailError(true);
                }
            } else {
                setEmailError(true);
            }
            if (user.password) {
                if (!user.password.match(passWordRegex)) {
                    setPasswordError(true);
                }
            } else {
                setPasswordError(true);
            }
            if (user.avatar) {
                if (!user.avatar.match(avatarRegex)) {
                    setAvatarError(true);
                }
            } else {
                setAvatarError(true);
            }
            setErr(nameError && emailError && passwordError && avatarError);
        }
    }

    return (
        <div className='form-container'>
            <h2>create account</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        helperText="Name should be letters only"
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        helperText="Must be a valid email address"
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
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        helperText="Must be only letters and numbers, longer than 3 characters"
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
                        label="Avatar"
                        name="avatar"
                        onChange={(e) => setAvatar(e.target.value)}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: avatarError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        helperText="Avatar error"
                        onFocus={()=> setAvatarError(false)}
                    />
                </FormControl> 
                <div className='btn-group'>
                    <IconButton type ="submit" onClick={()=> handleSubmit}>
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