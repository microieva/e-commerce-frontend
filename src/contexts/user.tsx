import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { useGetUserQuery } from '../redux/api-queries/auth-queries';
import { TypeUserContext } from '../@types/types';
import { User } from '../@types/user';

export const UserContext = createContext<TypeUserContext | null>(null); 

interface UserProviderProps {
    children: ReactNode
}

const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | undefined>();
    const [token, setToken] = useState<string>('');
    const { data } = useGetUserQuery(token);   

    const onLogout = () => {
        localStorage.removeItem('token');
        setUser(undefined);
    };
    const onLogin = () => {
        const storedToken: string = localStorage.getItem('token') || '';
        storedToken && setToken(JSON.parse(storedToken));
    }
    useEffect(() => {
        data && setUser(data);
    }, [data]);

    return <UserContext.Provider value={{ user, onLogout, onLogin }}>{ children }</UserContext.Provider>;
}

export default UserProvider;

