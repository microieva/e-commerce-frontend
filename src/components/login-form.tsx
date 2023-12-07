import { FormEvent, useContext, useEffect, useRef, useState } from 'react';

import { IconButton, TextField, FormControl } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';

import { useLoginMutation } from '../redux/api-queries/auth-queries';
import { FormContext } from '../contexts/form';

import { LoginRequest } from '../@types/auth';
import { TypeFormContext } from '../@types/types';


const LoginForm = () => {

    const [ request, setRequest ] = useState<LoginRequest | undefined>();

    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();

    const [ emailError, setEmailError ] = useState<boolean>(false);
    const [ passwordError, setPasswordError ] = useState<boolean>(false);

    const [ err, setErr ] = useState<boolean>(false);
    const { onClose } = useContext(FormContext) as TypeFormContext;
    const [ login, { error }] = useLoginMutation(); //implement api error with SnackBar
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRequest({email, password});
        onClose();
    };

    useEffect(()=> {
        if (request) {
            validate();
        }
        const initialLogin = async () => {
            if (!err) {
                try {
                    const token = request && await login(request).unwrap();
                    token && localStorage.setItem('token', JSON.stringify(token));
                    window.dispatchEvent(new Event('storage'))
                } catch (error){
                    setErr(true);
                    //formRef.current && formRef.current.reset();
                }
            }
        }
        initialLogin();
        console.log('error: ', error)
    }, [request, err]);

    const validate = () => {
        const emailRegex = new RegExp('^(?:[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2})');
        const passWordRegex = new RegExp('^[a-zA-Z0-9]{4,}');

        if (request) {
            if (request.email) {
                if (!request.email.match(emailRegex)) {
                    setEmailError(true);
                }
            } else {
                setEmailError(true);
            }
            if (request.password) {
                if (!request.password.match(passWordRegex)) {
                    setPasswordError(true);
                }
            } else {
                setPasswordError(true);
            }
            setErr(emailError && passwordError);
        }
    }

    return (
        <div className='form-container'>
            <h2>log in</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        helperText={ "Must be a valid email address"}
                        variant="standard"
                        label="Email"
                        name="email"
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        sx={{
                            '& .MuiFormHelperText-root': {
                              //visibility: !emailError && !error ? 'hidden' : 'visible',
                              visibility: error ? 'visible' : 'hidden',
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
                                visibility: !passwordError && !error ? 'hidden' : 'visible',
                                transition: 'visibility 0.2s ease-in',
                            }
                        }}
                        onFocus={()=>setPasswordError(false)}
                    />
                </FormControl>
                <div className="btn-group">
                    <IconButton  type="submit" onClick={() => handleSubmit}>
                        <LoginOutlinedIcon/>
                    </IconButton>
                    <IconButton onClick={()=> onClose()}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
              </form>
            </div>
    )
}

export default LoginForm;