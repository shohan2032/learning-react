// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import favoriteMealsReducer from "../slices/favoriteMealsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favoriteMeals: favoriteMealsReducer,
  },
});

export default store;
