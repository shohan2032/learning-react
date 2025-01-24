import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

// store is called single source of truth
export const store = configureStore({
    // reducer: {
    //     todos: todoReducer,
    // },
    reducer: todoReducer,
});
