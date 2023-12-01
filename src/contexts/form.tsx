import { FC, ReactNode, createContext, useState } from 'react';
import { TypeForm, TypeFormContext } from '../@types/types';

export const FormContext = createContext<TypeFormContext | null>(null); 

interface FormProviderProps {
    children: ReactNode,
    form?: TypeForm,
    onClose: ()=> void
}

const FormProvider: FC<FormProviderProps> = ({children, form, onClose}: FormProviderProps) => {
    return <FormContext.Provider value={{form, onClose}}>{ children }</FormContext.Provider>;
}

export default FormProvider;