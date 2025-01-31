import { createContext, useReducer } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: new Map(
    Object.entries(JSON.parse(localStorage.getItem("users")) || {})
  ),
  error: null,
  signUpSuccess: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SIGNUP":
      if (action.payload.password.length < 5) {
        return {
          ...state,
          error: "Password must be at least 5 characters long",
        };
      }
      const { username, password } = action.payload;
      if (state.users.has(username)) {
        return { ...state, error: "Username already exists" };
      }

      state.users.set(username, password);
      localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(state.users))
      );

      return { ...state, signUpSuccess: true, error: null };

    case "RESET_SIGNUP":
      return { ...state, signUpSuccess: false };

    case "LOGIN":
      if (
        state.users.has(action.payload.username) &&
        state.users.get(action.payload.username) === action.payload.password
      ) {
        localStorage.setItem("user", JSON.stringify(action.payload.username));
        return { ...state, user: action.payload.username, error: null };
      }
      return { ...state, error: "Invalid username or password" };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null, error: null };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
}

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
