import { createContext, useReducer } from "react";
import { AuthState, AuthAction } from "../interface/contextInterface";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  users: new Map(
    Object.entries(JSON.parse(localStorage.getItem("users") || "{}"))
  ),
  error: null,
  signUpSuccess: false,
};

function authReducer(state:AuthState, action:AuthAction):AuthState {
  switch (action.type) {
    case "SIGNUP":
      if (action.payload.password.length < 5) {
        return {
          ...state,
          error: "Password must be at least 5 characters long",
        };
      }

      // const { username, password } = action.payload;

      if (state.users.has(action.payload.username)) {
        return {
          ...state,
          error: "Username already exists",
          signUpSuccess: false,
        };
      }

      console.log("User created successfully");

      const updatedUsers = new Map(state.users);
      updatedUsers.set(action.payload.username, action.payload.password);

      localStorage.setItem(
        "users",
        JSON.stringify(Object.fromEntries(updatedUsers))
      );

      return {
        ...state,
        users: updatedUsers,
        signUpSuccess: true,
        error: null,
      };

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

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  state: initialState,
  dispatch: () => null,
});
export function AuthProvider({ children }: { children: React.ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;


// import { createContext, useReducer, ReactNode, Dispatch } from "react";

// // Define the state structure
// interface AuthState {
//   user: string | null;
//   users: Map<string, string>;
//   error: string | null;
//   signUpSuccess: boolean;
// }

// // Define action types
// type AuthAction =
//   | { type: "SIGNUP"; payload: { username: string; password: string } }
//   | { type: "RESET_SIGNUP" }
//   | { type: "LOGIN"; payload: { username: string; password: string } }
//   | { type: "LOGOUT" }
//   | { type: "CLEAR_ERROR" };

// // Initial state
// const initialState: AuthState = {
//   user: JSON.parse(localStorage.getItem("user") || "null"),
//   users: new Map<string, string>(
//     Object.entries(JSON.parse(localStorage.getItem("users") || "{}"))
//   ),
//   error: null,
//   signUpSuccess: false,
// };

// // Reducer function
// function authReducer(state: AuthState, action: AuthAction): AuthState {
//   switch (action.type) {
//     case "SIGNUP": {
//       if (action.payload.password.length < 5) {
//         return { ...state, error: "Password must be at least 5 characters long" };
//       }

//       const { username, password } = action.payload;
//       if (state.users.has(username)) {
//         return { ...state, error: "Username already exists" };
//       }

//       const newUsers = new Map(state.users);
//       newUsers.set(username, password);
//       localStorage.setItem("users", JSON.stringify(Object.fromEntries(newUsers)));

//       return { ...state, users: newUsers, signUpSuccess: true, error: null };
//     }

//     case "RESET_SIGNUP":
//       return { ...state, signUpSuccess: false };

//     case "LOGIN":
//       if (
//         state.users.has(action.payload.username) &&
//         state.users.get(action.payload.username) === action.payload.password
//       ) {
//         localStorage.setItem("user", JSON.stringify(action.payload.username));
//         return { ...state, user: action.payload.username, error: null };
//       }
//       return { ...state, error: "Invalid username or password" };

//     case "LOGOUT":
//       localStorage.removeItem("user");
//       return { ...state, user: null, error: null };

//     case "CLEAR_ERROR":
//       return { ...state, error: null };

//     default:
//       return state;
//   }
// }

// // Define the context type
// interface AuthContextType {
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // AuthProvider component
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthContext;
