// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import blogReducer from "../slices/blog";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteBlogs: blogReducer,
  },
});

export default store;
