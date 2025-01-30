import { createSlice } from "@reduxjs/toolkit";

const allUsers = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: currentUser,
  users: new Map(Object.entries(allUsers)),
  error: null,
  signUpSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      if (action.payload.password.length < 5) {
        state.error = "Password must be at least 5 characters long";
        return;
      }
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

      // state.user = username;
      // localStorage.setItem("user", JSON.stringify(username));
      state.signUpSuccess = true;
      state.error = null;
    },
    resetSignUpSuccess: (state) => {
      state.signUpSuccess = false;
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
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, resetSignUpSuccess, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
