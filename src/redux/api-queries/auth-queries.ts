import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginRequest, LoginResponse } from '../../@types/auth';
import { User } from '../../@types/user';

const authQueries = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/auth' }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: 'login', method: 'POST', body }),
      transformErrorResponse() { return { message: 'Invalid username or password' }},
    }),
    getUser: build.query<User, string>({
      query: (token) => ({ url: 'profile', headers: { 'Authorization': `Bearer ${token}`}
      }),
      //transformErrorResponse() { return { message: 'Invalid token' }},
    }),
  }),
});

export const { 
  useLoginMutation, 
  useGetUserQuery 
} = authQueries;

export default authQueries;

