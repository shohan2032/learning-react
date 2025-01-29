import { createSlice } from "@reduxjs/toolkit";

const storedFavorites = JSON.parse(localStorage.getItem("favoriteMeals")) || {};

const initialState = {
  favoriteMeals: new Map(Object.entries(storedFavorites)), 
};

const favoriteMealsSlice = createSlice({
  name: "favoriteMeals",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { username, mealId } = action.payload;

      if (!state.favoriteMeals.has(username)) {
        state.favoriteMeals.set(username, []); 
      }

      const userFavorites = state.favoriteMeals.get(username);
      if (!userFavorites.includes(mealId)) {
        userFavorites.push(mealId);
      }

      
      localStorage.setItem(
        "favoriteMeals",
        JSON.stringify(Object.fromEntries(state.favoriteMeals))
      );
    },
    removeFavorite: (state, action) => {
      const { username, mealId } = action.payload;

      if (state.favoriteMeals.has(username)) {
        const userFavorites = state.favoriteMeals.get(username);
        state.favoriteMeals.set(
          username,
          userFavorites.filter((id) => id !== mealId)
        );
        
        localStorage.setItem(
          "favoriteMeals",
          JSON.stringify(Object.fromEntries(state.favoriteMeals))
        );
      }
    },
  },
});

export const { addFavorite, removeFavorite } =
  favoriteMealsSlice.actions;
export default favoriteMealsSlice.reducer;
