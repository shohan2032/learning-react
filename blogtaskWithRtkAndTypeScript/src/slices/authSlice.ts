import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface/reduxInterface";

// Define the shape of the state
// interface AuthState {
//   user: string | null;
//   users: Map<string, string>;
//   error: string | null;
//   signUpSuccess: boolean;
// }

// Get users and current user from localStorage, ensuring proper types
const allUsers: Record<string, string> = JSON.parse(localStorage.getItem("users") || "{}");
const currentUser: string | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

const initialState: AuthState = {
  user: currentUser,
  users: new Map(Object.entries(allUsers)),
  error: null,
  signUpSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sign up action
    signup: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;

      if (password.length < 5) {
        state.error = "Password must be at least 5 characters long";
        return;
      }

      if (state.users.has(username)) {
        state.error = "Username already exists";
        return;
      }

      state.users.set(username, password);
      localStorage.setItem("users", JSON.stringify(Object.fromEntries(state.users)));
      
      state.signUpSuccess = true;
      state.error = null;
    },

    // Reset signup success flag
    resetSignUpSuccess: (state) => {
      state.signUpSuccess = false;
    },

    // Login action
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;

      if (state.users.has(username) && state.users.get(username) === password) {
        state.user = username;
        localStorage.setItem("user", JSON.stringify(username));
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.error = null;
    },

    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, resetSignUpSuccess, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
