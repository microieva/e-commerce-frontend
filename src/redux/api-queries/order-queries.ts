import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order, OrderRequest } from '../../@types/cart';
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
            invalidatesTags: ['Orders']
        }),
        
    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    //useGetOrderByUserIdQuery,
    //useDeleteOrderMutation, 
    //useGetOrderByIdQuery,
    //useUpdateOrderMutation
} = orderQueries;
export default orderQueries;

