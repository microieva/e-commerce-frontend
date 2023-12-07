import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../common/common';
import { LoginRequest, LoginResponse } from '../../@types/auth';
import { User } from '../../@types/user';

const authQueries = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/auth` }),
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    login: build.mutation<string, LoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      //onQueryStarted(dispatch){}
    }),

    createUser: build.mutation<string, Partial<User>>({ 
      query: (body) => ({url: `/signup`, method: 'POST', body}),
      //invalidatesTags: ['Users'],
      //transformErrorResponse() { return { message: 'Error' }}, // TESTING IN UI
    }),
    getUser: build.query<User, string>({
      query: (token) => (token && { url: '/profile', headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
      }),
      //transformErrorResponse() { return { message: 'Invalid token' }},
      
    })
  }),
});

export const { 
  useLazyGetUserQuery,
  useLoginMutation, 
  useCreateUserMutation 
} = authQueries;

export default authQueries;

