import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../@types/user';

const initialState: User[] = [];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload)
        },
        removeUser: (state, action) => {
            const index = state.findIndex(p => p.id === action.payload);
            state.splice(index, 1);
        }
    }
});

const users = usersSlice.reducer;
export const { addUser, removeUser } = usersSlice.actions;

export default users;