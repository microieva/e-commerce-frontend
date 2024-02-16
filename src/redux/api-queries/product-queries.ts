import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductRequest } from '../../@types/product';
import { url } from '../../common/common';

const productQueries  = createApi({

    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/products`
    }),
    tagTypes: ['Products', 'Product'],
    endpoints: builder => ({
        getProducts: builder.query<Product[], undefined>({
            query: () => `/`,
            providesTags: ['Products']
        }),
        getProductById: builder.query<Product, string>({
            query: (productId) => `/${productId}`,
            providesTags: ['Product']
        }), 
        getFilteredProductsByTitle: builder.query<Product[], { title: string }>({
            query: ({ title }) => ({url:`/search/?title=${title}`}),
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
            invalidatesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetFilteredProductsByTitleQuery, 
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation, 
    useDeleteProductsMutation
} = productQueries;
export default productQueries;
