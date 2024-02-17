import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem, Order, OrderRequest } from '../../@types/cart';
import { url } from '../../common/common';

const orderQueries  = createApi({

    reducerPath: "orderReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/orders`
    }),
    tagTypes: ['Orders', 'Order'],
    endpoints: builder => ({
        getOrders: builder.query<Order[], OrderRequest>({
            query: (orderRequest) => ({
                url: `/`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${JSON.parse(orderRequest.token)}`}

            }),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Orders']
        }),
        getOrdersByUserId: builder.query<Order[], {token: string, userId: string}>({
            query: ({token, userId}) => ({
                url: `/user/${userId}`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                
            }),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Orders']
        }),
        getOrderItems: builder.query<CartItem[], OrderRequest>({
            query: ({token, orderId}) => ({
                url: `/items/${orderId}`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                
            }),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Orders']
        }),
        createOrder: builder.mutation<Order, OrderRequest>({
            query: (orderRequest) => (orderRequest && 
                {
                    url: `/checkout/${orderRequest.userId}`, 
                    method: 'POST', 
                    body: orderRequest.body, 
                    headers: { 'Authorization': `Bearer ${JSON.parse(orderRequest.token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Orders']
        }),
        updateOrder: builder.mutation<Order, OrderRequest>({
            query: (orderRequest) =>  (
                {
                    url: `/order/${orderRequest.orderId}`, 
                    method: 'PUT', 
                    body: orderRequest.body,
                    headers: { 'Authorization': `Bearer ${JSON.parse(orderRequest.token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Orders']
        }),
        deleteOrder: builder.mutation<{ msg: string }, {orderId: string, token: string}>({
            query: ({orderId, token}) =>  (
                {
                    url: `/${orderId}`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Orders']
        }),
        deleteUserOrders: builder.mutation<{ msg: string}, { userId: string, token: string}>({
            query: ({userId, token}) =>  (
                {
                    url: `/user/${userId}`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Orders']
        }),
        deleteOrders:  builder.mutation<{ msg: string }, {token: string}>({
            query: ({token}) =>  (
                {
                    url: `/orders`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Orders']
        })
    })
})

export const {
    useGetOrdersQuery,
    useGetOrdersByUserIdQuery,
    useGetOrderItemsQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useDeleteUserOrdersMutation,
    useDeleteOrdersMutation
} = orderQueries;
export default orderQueries;

