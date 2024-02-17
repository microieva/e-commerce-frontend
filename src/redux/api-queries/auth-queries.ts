import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../common/common';
import { LoginRequest } from '../../@types/auth';
import { User } from '../../@types/user';

const authQueries = createApi({
  reducerPath: 'authReducer',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/auth` }),
  tagTypes: ['User'],
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    login: build.mutation<string, LoginRequest>({
      query: (body) => ({ 
        url: '/login', 
        method: 'POST', 
        body
      }),
      transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
      invalidatesTags: ['User']
      }),

    createUser: build.mutation<string, Partial<User>>({ 
      query: (body) => ({url: `/signup`, method: 'POST', body}),
      transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
      invalidatesTags: ['User']
    }),
    getUser: build.query<User, string>({
      query: (token) => (token && { url: '/profile', headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}}),
      transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
      providesTags: ['User']
  })
}) })

export const { 
  useGetUserQuery,
  useLoginMutation, 
  useCreateUserMutation 
} = authQueries;

export default authQueries;

