import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../@types/user';

const userQueries  = createApi({

    reducerPath: 'userReducer',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/users' }),
    tagTypes: ['Users', 'User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '',
            providesTags: ['Users']
        }),
        addUser: builder.mutation<User, Partial<User>>({ 
            query: (body) => ({url: `/`, method: 'POST', body}),
            invalidatesTags: ['Users'],
            //transformErrorResponse() { return { message: 'Error' }}, // TESTING IN UI
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: ({id, ...updates}) =>  ({url: `/${id}`, method: 'PUT', body: updates}),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<boolean, number>({
            query: (userId) =>  ({url: `/${userId}`, method: 'DELETE'}),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetUsersQuery, 
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
} = userQueries;
export default userQueries;

