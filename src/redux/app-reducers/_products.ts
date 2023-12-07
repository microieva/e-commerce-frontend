import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../@types/product';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginationQuery } from '../../@types/paginationQuery';

const initialState: {
    products: Product[],
    error?: string,
    loading: boolean
} = {
    products: [],
    loading: false
};

export const fetchProductsAsync = createAsyncThunk(
    'fetchProductsAsync',
    async ({ limit, offset }: PaginationQuery) => {
        try {
            const response: AxiosResponse = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
            return response.data;
        } catch(e) {
            const err = e as AxiosError;
            return err.message;
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(p => p._id === action.payload);
            state.products.splice(index, 1);
        },
        sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            if (action.payload === 'asc') {
                state.products.sort((a,b) => a.price - b.price)
            } else {
                state.products.sort((a, b)=> b.price - a.price)
            }
        },
    },
    // extraReducers meant for dealing with async functions
    extraReducers: (builder) => {
        builder.addCase(
            fetchProductsAsync.fulfilled, (state, action) => { 
                if (!(action.payload instanceof Error)) {
                    return {
                        ...state,
                        products: action.payload,
                        loading: false
                    }
                }    
            }
        );
        builder.addCase(
            fetchProductsAsync.pending, (state, action) => {
               return {
                ...state,
                loading: true
               }
            }
        );
        builder.addCase(
            fetchProductsAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) { 
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message
                    }
                }
                
            }
        );
    }
});

const products = productsSlice.reducer; // only sync actions
console.log('products?? from reducer: ', products);
export const { addProduct, removeProduct, sortByPrice } = productsSlice.actions;

export default products;
