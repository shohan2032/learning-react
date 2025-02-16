import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface/reduxInterface";

const initialState: AuthState = {
  user: { id: 0, username: "" },
  signUpSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sign up action
    signup: (state) => {
      state.signUpSuccess = true;
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
    },

    // Logout action
    logout: (state) => {
      // console.log("logout");
      state.user.id = 0;
      state.user.username = "";
    },  },
});

export const {
  signup,
  resetSignUpSuccess,
  setCurrentUser,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
