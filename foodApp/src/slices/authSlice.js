import { createSlice } from "@reduxjs/toolkit";

const allUsers = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: currentUser, // The currently logged-in user
  users: new Map(Object.entries(allUsers)), // All registered users
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const { username, password } = action.payload;

      if (state.users.has(username)) {
        throw new Error("Username already exists");
      }

      // Add the new user to the state and persist in localStorage
      state.users.set(username, password);
      localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(state.users))
      );

      // Optionally, log the user in immediately after registration
      state.user = username;
      localStorage.setItem("user", JSON.stringify(username));
    },
    login: (state, action) => {
      const { username, password } = action.payload;

      if (state.users.has(username) && state.users.get(username) === password) {
        state.user = username;
        localStorage.setItem("user", JSON.stringify(username)); // Persist user
      } else {
        throw new Error("Invalid username or password");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Clear persisted user
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
