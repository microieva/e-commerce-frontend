import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../common/common';
import { Category, CategoryRequest, Product } from '../../@types/product';


const categoryQueries = createApi({
    reducerPath: "categoryReducer",
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/categories` }),
    tagTypes: ['Categories', 'Products', 'Category'],
    endpoints: (build) => ({
        getCategories: build.query<Category[], string>({
            query: (token) => (token && { url: '/', headers: { 'Authorization': `Bearer ${JSON.parse(token)}`}}),
            providesTags: ['Categories']
        }),
        getCategoryById: build.query<Category, string>({
            query: (categoryId) => `/${categoryId}`,
            providesTags: ['Category']
        }),
        getProductsByCategory: build.query<Product[], number>({
            query: (categoryId) => `/${categoryId}/products`,
            providesTags: ['Products'],
        }),
        deleteCategory: build.mutation<{ msg: string}, CategoryRequest>({
            query: (categoryRequest) =>  (
                {
                    url: `/${categoryRequest.categoryId}`, 
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${JSON.parse(categoryRequest.token)}`}
                }
            ),
            invalidatesTags: ['Categories']
        })
    }),
});

export const { 
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetProductsByCategoryQuery,
    useDeleteCategoryMutation
 } = categoryQueries;
export default categoryQueries;