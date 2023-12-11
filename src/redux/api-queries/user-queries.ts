import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../common/common';
import { User } from '../../@types/user';

const userQueries  = createApi({

    reducerPath: 'userReducer',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/users` }),
    tagTypes: ['Users', 'User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '',
            providesTags: ['Users', 'User']
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: ({_id, ...updates}) =>  ({url: `/${_id}`, method: 'PUT', body: updates}),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<boolean, string>({
            query: (userId) =>  ({url: `/${userId}`, method: 'DELETE'}),
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

