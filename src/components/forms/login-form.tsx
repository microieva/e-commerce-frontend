import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl, Box } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';

import { useLoginMutation } from '../../redux/api-queries/auth-queries';
import { FormContext } from '../../contexts/form';

import { LoginRequest } from '../../@types/auth';
import { TypeFormContext, TypeSnackBarContext } from '../../@types/types';
import { SnackBarContext } from '../../contexts/snackbar';


const LoginForm = () => {

    const [ request, setRequest ] = useState<LoginRequest | undefined>();

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);

    const { onClose } = useContext(FormContext) as TypeFormContext;
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const [ login, { status }] = useLoginMutation();
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);

    const emailRegex = new RegExp('^(?:[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2})');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPasswordError(!event.target.value);
        setPassword(event.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequest({email, password});
        onClose();
    };

    useEffect(()=> {
        if (
            email !== '' && !emailError &&
            password !== '' && !passwordError
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [password, emailError, passwordError]);

    useEffect(()=> {
        const initialLogin = async () => {
            if (request) {
                try {
                    const token = request && await login(request).unwrap();
                    token && localStorage.setItem('token', JSON.stringify(token));
                    window.dispatchEvent(new Event('storage'))
                } catch (error){
                    setSnackBar({message: error as string, open: true});
                }
            }
        }
        initialLogin();
    }, [request]);

    return (
        <div className='form-container login-signup-form'>
            <h2>log in</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        helperText={email==='' ? "Email is required" : "Must be a valid email address"}
                        variant="standard"
                        label="Email"
                        name="email"
                        onChange={handleEmailChange}
                        onBlur={(event)=>setEmailError(!emailRegex.test(event.target.value))}
                        required
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
                        required
                        helperText="Passowrd is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                                visibility: passwordError ? 'visible' : 'hidden',
                                transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>setPasswordError(false)}
                    />
                </FormControl>
                <div className="btn-group">
                    <IconButton  type="submit" disabled={disabled}>
                        <LoginOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={()=> onClose()}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </form>
            {/* {
                Boolean(snackBar) &&
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={Boolean(snackBar)}
                    //onClose={handleClose}
                    message={snackBar}
                    //key={vertical + horizontal}
                    autoHideDuration={4000}
                    TransitionComponent={Slide}
              />
            } */}
        </div>
    )
}

export default LoginForm;