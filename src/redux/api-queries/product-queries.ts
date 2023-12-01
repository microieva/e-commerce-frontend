import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../@types/product';
import { url } from '../../common/common';

const productQueries  = createApi({

    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/products`
    }),
    tagTypes: ['Products', 'Product'],
    endpoints: builder => ({
        // this creates a hook from dispatch and async thunk action -> to return data error and loading
        getProducts: builder.query<Product[], undefined>({
            query: () => `/`,
            providesTags: ['Products']
        }),
        getProductById: builder.query<Product, string>({
            query: (productId) => `/${productId}`,
            providesTags: ['Product']
        }), 
        getFilteredProductsByTitle: builder.query<Product[], string>({
            query: (query) => ({url:`/search/?title=${query}`}),
            providesTags: ['Products']
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({url: `/`, method: 'POST', body}),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation<Product, Partial<Product>>({
            query: ({_id, ...updates}) =>  ({url: `/${_id}`, method: 'PUT', body: updates}),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation<boolean, string>({
            query: (productId) => ({url: `${productId}`, method: 'DELETE'}),
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetFilteredProductsByTitleQuery, 
    useDeleteProductMutation, 
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation
} = productQueries;
export default productQueries;

