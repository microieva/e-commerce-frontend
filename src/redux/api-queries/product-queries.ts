import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductRequest } from '../../@types/product';
import { url } from '../../common/common';
import { CartItem } from '../../@types/cart';

const productQueries  = createApi({

    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/products`
    }),
    tagTypes: ['Products', 'Product'],
    endpoints: builder => ({
        getProducts: builder.query<Product[], undefined>({
            query: () => `/`,
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Products']
        }),
        getMostRecentlyOrderedProducts: builder.query<CartItem[], undefined>({
            query: () => `/recent`,
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]}
        }),
        getProductById: builder.query<Product, string>({
            query: (productId) => `/${productId}`,
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Product']
        }), 
        getFilteredProductsByTitle: builder.query<Product[], { title: string }>({
            query: ({ title }) => ({url:`/search/?title=${title}`}),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            providesTags: ['Products']
        }),
        createProduct: builder.mutation<Product, ProductRequest>({
            query: (productRequest) => (productRequest && 
                {
                    url: `/`, 
                    method: 'POST', 
                    body: productRequest.body, 
                    headers: { 'Authorization': `Bearer ${JSON.parse(productRequest.token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation<Product, ProductRequest>({
            query: (productRequest) =>  (
                {
                    url: `/${productRequest.productId}`, 
                    method: 'PUT', 
                    body: productRequest.body,
                    headers: { 'Authorization': `Bearer ${JSON.parse(productRequest.token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation<Product, ProductRequest>({
            query: (productRequest) => (
                {
                    url: `${productRequest.productId}`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(productRequest.token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Products']
        }),
        deleteProducts: builder.mutation<{msg: string}, string>({
            query: (token) => (
                {
                    url: `/products`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}
                }
            ),
            transformErrorResponse:(error) => {return error.data && Object.values(error.data)[0]},
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetFilteredProductsByTitleQuery, 
    useGetMostRecentlyOrderedProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation, 
    useDeleteProductsMutation
} = productQueries;
export default productQueries;
