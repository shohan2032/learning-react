// slices/favoriteMealsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load persisted favorites from localStorage
const storedFavorites = JSON.parse(localStorage.getItem("favoriteMeals")) || {};

const initialState = {
  favoriteMeals: new Map(Object.entries(storedFavorites)), // Convert stored object to Map
};

const favoriteMealsSlice = createSlice({
  name: "favoriteMeals",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { username, mealId } = action.payload;

      if (!state.favoriteMeals.has(username)) {
        state.favoriteMeals.set(username, []); // Initialize if no entry exists
      }

      const userFavorites = state.favoriteMeals.get(username);
      if (!userFavorites.includes(mealId)) {
        userFavorites.push(mealId);
      }

      // Persist to localStorage
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

        // Persist to localStorage
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
