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
        createProduct: builder.mutation<Product, ProductRequest>({
            query: (productRequest) => (productRequest && 
                {
                    url: `/`, 
                    method: 'POST', 
                    body: productRequest.body, 
                    headers: { 'Authorization': `Bearer ${JSON.parse(productRequest.token)}`}
                }
            ),
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
    useCreateProductMutation,
    useUpdateProductMutation
} = productQueries;
export default productQueries;

