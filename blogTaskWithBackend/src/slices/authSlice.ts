import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface/reduxInterface";

const initialState: AuthState = {
  user: { id: 0, username: "" },
  error: null,
  signUpSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sign up action
    signup: (state) => {
      state.signUpSuccess = true;
      state.error = null;
    },

    // Reset signup success flag
    resetSignUpSuccess: (state) => {
      state.signUpSuccess = false;
    },

    setCurrentUser: (
      state,
      action: PayloadAction<{ id: number; username: string }>
    ) => {
      state.user = action.payload;
      state.error = null;
    },

    // Logout action
    logout: (state) => {
      console.log("logout");
      state.user.id = 0;
      state.user.username = "";
      state.error = null;
    },

    setError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  signup,
  resetSignUpSuccess,
  setCurrentUser,
  logout,
  setError,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
