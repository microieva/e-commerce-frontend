import { FC, useContext } from 'react';

import { FormContext } from '../contexts/form';
import { TypeFormContext } from '../@types/types';

//import { Form } from './_form';

import SignupForm from './signup-form';
import LoginForm from './login-form';
                                
const FormSwitcher = () => {
    const { form } = useContext(FormContext) as TypeFormContext;
    
    /*switch (form) {
        case 'signup':
            return <Form schema={{
                name: "",
                email: "",
                password: "",
                avatar: ""
            }}/>
        case 'login':
            return <Form schema={{
                email: "",
                password: ""
            }}/>
        default: 
            return <></>
    }*/
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

/* dynamic form maybe would accept 1 parameter, schema, which will be either user or product. 
then we transform shcema into arr of key-value pairs:

const arr = Object.keys(schema).map((key) => ({
        key,
        value: product[key as keyof Product | User]
    }));


{arr.map(productKeyValuePair => {
                            return (
                               <>
                                    <p>{productKeyValuePair.key}:</p>
                                    <p>{productKeyValuePair.value?.toString()}</p>
                               </>
                            )
                    })}
*/