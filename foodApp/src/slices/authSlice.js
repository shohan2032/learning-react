import { createSlice } from "@reduxjs/toolkit";

const allUsers = JSON.parse(localStorage.getItem("users")) || {};
// const currentUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: null, 
  users: new Map(Object.entries(allUsers)), 
  error: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { username, password } = action.payload;

      if (state.users.has(username)) {
        state.error = "Username already exists"; 
        return;
      }

      state.users.set(username, password);
      localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(state.users))
      );

      state.user = username;
      localStorage.setItem("user", JSON.stringify(username));
      state.error = null;
    },
    login: (state, action) => {
      const { username, password } = action.payload;

      if (state.users.has(username) && state.users.get(username) === password) {
        state.user = username;
        localStorage.setItem("user", JSON.stringify(username));
        state.error = null; 
      } else {
        state.error = "Invalid username or password";
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.error = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
