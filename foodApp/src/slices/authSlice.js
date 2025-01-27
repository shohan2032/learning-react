import { createSlice } from "@reduxjs/toolkit";

const allUsers = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: currentUser, 
  users: new Map(Object.entries(allUsers)), 
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

      state.users.set(username, password);
      localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(state.users))
      );

      // instantly login the user
      state.user = username;
      localStorage.setItem("user", JSON.stringify(username));
    },
    login: (state, action) => {
      const { username, password } = action.payload;

      if (state.users.has(username) && state.users.get(username) === password) {
        state.user = username;
        localStorage.setItem("user", JSON.stringify(username)); 
      } else {
        throw new Error("Invalid username or password");
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
