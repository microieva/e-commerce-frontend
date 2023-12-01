import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category, Product } from '../../@types/product';


const categoryQueries = createApi({

    reducerPath: "categoryReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/categories'
    }),
    tagTypes: ['Categories', 'Products', 'Category'],
    endpoints: (build) => ({
        getCategories: build.query<Category[], undefined>({
            query: () => '/',
            providesTags: ['Categories'],
        }),
        getCategoryById: build.query<Category, number>({
            query: (categoryId) => `/${categoryId}`,
            providesTags: ['Category']
        }),
        getProductsByCategory: build.query<Product[], number>({
            query: (categoryId) => `/${categoryId}/products`,
            providesTags: ['Products'],
        })
    }),
});

export const { 
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetProductsByCategoryQuery
 } = categoryQueries;
export default categoryQueries;