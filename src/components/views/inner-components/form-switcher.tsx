import { useContext } from 'react';
import { FormContext } from '../../../contexts/form';
import { TypeFormContext } from '../../../@types/types';
import SignupForm from '../../forms/signup-form';
import LoginForm from '../../forms/login-form';
                                
const FormSwitcher = () => {
    const { form } = useContext(FormContext) as TypeFormContext;
    
    switch (form) {
        case 'signup':
            return <SignupForm />
        case 'login':
            return <LoginForm />
        default: 
            return <></>
    }
      
}
export default FormSwitcher;
