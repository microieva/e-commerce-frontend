import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../common/common';
import { User, UserRequest } from '../../@types/user';

const userQueries  = createApi({

    reducerPath: 'userReducer',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/users` }),
    tagTypes: ['Users', 'User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], string>({
            query: (token) =>  ({
                url: `/`, 
                method: 'GET', 
                headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
            }),
            providesTags: ['Users', 'User']
        }),
        updateUser: builder.mutation<User, UserRequest>({
            query: (userRequest) =>  (
                {
                    url: `/${userRequest._id}`, 
                    method: 'PUT', 
                    body: userRequest.body,
                    headers: { 'Authorization': `Bearer ${JSON.parse(userRequest.token)}`}
                }
            ),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<{ msg: string }, UserRequest>({
            query: (userRequest) =>  ({
                url: `/${userRequest._id}`, 
                method: 'DELETE', 
                headers: { 'Authorization': `Bearer ${JSON.parse(userRequest.token)}`}
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery, 
    useDeleteUserMutation,
    useUpdateUserMutation
} = userQueries;
export default userQueries;

