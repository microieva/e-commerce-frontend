import { useEffect, useState } from 'react';
//import { setLoading, setUser, setError } from '../redux/userSlice'; // Replace with your user-related slice
import { useAppDispatch } from './useAppDispatch';
//import { useLazyGetUserQuery } from '../redux/api-queries/user-queries';
import { setUser } from '../redux/app-reducers/user';

const useAppUser = () => {
    const [ token, setToken ] = useState<string>(localStorage.getItem('token') || '');
    // const { data } = useGetUserQuery(token, {
    //     skip: !token
    // })
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tkn = localStorage.getItem('token') || '';
        if (tkn) {
            setToken(tkn);
        }
        //data && dispatch(setUser(data));
    }, [token])
};

//export default useAppUser;
