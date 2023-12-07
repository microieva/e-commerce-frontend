import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../@types/user";
//import { useLazyGetUserQuery } from "../api-queries/user-queries";

const initialState: {
    data: User | undefined,
    error?: {},
    loading?: boolean
} = {
    data: undefined,
    //loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                user: action.payload,
            }
        },
        clearUser: (state) => {
            return {
                ...state,
                user: undefined,
            }
        }
    }
})

const userReducer = userSlice.reducer; 
export const { setUser, clearUser } = userSlice.actions;
export default userReducer;